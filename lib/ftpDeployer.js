const fs = require('fs');
const path = require('path');
const ftp = require('basic-ftp');
const { DeployError } = require('./deployError');
const { buildPublicUrl } = require('./urlBuilder');
const logger = require('./logger');

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function validateSlug(slug) {
  if (!slug || typeof slug !== 'string' || !SLUG_PATTERN.test(slug)) {
    throw new DeployError(
      'validacao',
      `Slug invalido: "${slug}". Use apenas letras minusculas, numeros e hifens (ex: cliente-exemplo).`,
      { client: slug, suggestion: 'Renomeie a pasta do cliente para usar somente [a-z0-9-].' }
    );
  }
}

function validateLocalDir(slug, localDir) {
  const resolved = path.resolve(localDir);
  if (!fs.existsSync(resolved)) {
    throw new DeployError('validacao', `Pasta local nao encontrada: ${resolved}`, {
      client: slug,
      suggestion: 'Confirme o caminho da pasta do cliente antes de rodar o deploy.',
    });
  }
  if (!fs.statSync(resolved).isDirectory()) {
    throw new DeployError('validacao', `O caminho informado nao e uma pasta: ${resolved}`, {
      client: slug,
    });
  }
  const files = listFilesRecursive(resolved);
  if (files.length === 0) {
    throw new DeployError('validacao', `A pasta do cliente esta vazia: ${resolved}`, {
      client: slug,
      suggestion: 'Adicione os arquivos da pagina do cliente antes de publicar.',
    });
  }
  return resolved;
}

function listFilesRecursive(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listFilesRecursive(fullPath));
    } else if (entry.isFile()) {
      results.push(fullPath);
    }
  }
  return results;
}

function mapFtpError(stage, err, { client, file, defaultSuggestion } = {}) {
  const code = err && err.code;
  const message = (err && err.message) || String(err);
  let suggestion = defaultSuggestion;

  if (/530/.test(message) || /auth/i.test(message)) {
    suggestion = 'Verifique FTP_USER e FTP_PASSWORD no .env. A senha pode estar incorreta ou expirada no painel da Hostinger.';
  } else if (code === 'ECONNREFUSED') {
    suggestion = 'Conexao recusada. Verifique FTP_HOST e FTP_PORT, e se o servidor FTP da Hostinger esta habilitado.';
  } else if (code === 'ETIMEDOUT' || /timeout/i.test(message)) {
    suggestion = 'Tempo de conexao esgotado. Verifique sua rede, firewall/proxy e se a porta 21 esta liberada.';
  } else if (code === 'ENOTFOUND') {
    suggestion = 'Host nao encontrado. Confira se FTP_HOST esta correto (195.35.41.20).';
  } else if (/550/.test(message)) {
    suggestion = 'Permissao negada ou diretorio inexistente no servidor. Verifique FTP_REMOTE_ROOT e as permissoes da conta FTP.';
  } else if (/altnames|does not match certificate/i.test(message)) {
    suggestion = 'O certificado TLS do servidor nao cobre o host/IP usado na conexao (comum em hospedagem compartilhada). ' +
      'Defina FTP_TLS_REJECT_UNAUTHORIZED=false no .env (ou no workflow) para aceitar o certificado mesmo assim ' +
      '(a conexao continua criptografada, so a verificacao de identidade do host e relaxada).';
  }

  return new DeployError(stage, message, { client, file, suggestion, cause: err });
}

async function deployClient(slug, localDir, config, { onProgress } = {}) {
  validateSlug(slug);
  const resolvedLocalDir = validateLocalDir(slug, localDir);
  const files = listFilesRecursive(resolvedLocalDir);
  const remoteClientDir = config.ftp.remoteRoot.replace(/\/+$/, '') + '/' + slug;

  const client = new ftp.Client(30000);
  client.ftp.verbose = false;

  let bytesTotalSent = 0;

  try {
    try {
      logger.step(`Conectando em ${config.ftp.host}:${config.ftp.port} (FTPS: ${config.ftp.secure ? 'sim' : 'nao'})...`);
      await client.access({
        host: config.ftp.host,
        port: config.ftp.port,
        user: config.ftp.user,
        password: config.ftp.password,
        secure: config.ftp.secure,
        secureOptions: config.ftp.secure
          ? { rejectUnauthorized: config.ftp.rejectUnauthorized }
          : undefined,
      });
      logger.success('Conexao autenticada com sucesso.');
    } catch (err) {
      throw mapFtpError('conexao', err, {
        client: slug,
        defaultSuggestion: 'Falha ao conectar/autenticar no servidor FTP.',
      });
    }

    try {
      logger.step(`Verificando/criando diretorio remoto ${remoteClientDir}...`);
      await client.ensureDir(remoteClientDir);
      logger.success(`Diretorio remoto pronto: ${remoteClientDir}`);
    } catch (err) {
      throw mapFtpError('criar-diretorio', err, {
        client: slug,
        defaultSuggestion: `Falha ao criar/acessar o diretorio remoto ${remoteClientDir}.`,
      });
    }

    client.trackProgress((info) => {
      if (info.type === 'upload') {
        bytesTotalSent = info.bytesOverall;
        logger.progress(info.name, info.bytes, info.bytesOverall);
        onProgress && onProgress({ file: info.name, bytes: info.bytes, bytesOverall: info.bytesOverall });
      }
    });

    try {
      logger.step(`Enviando ${files.length} arquivo(s) de ${resolvedLocalDir}...`);
      await client.uploadFromDir(resolvedLocalDir, remoteClientDir);
      logger.progressDone();
      client.trackProgress();
      logger.success(`Upload concluido: ${files.length} arquivo(s), ${(bytesTotalSent / 1024).toFixed(1)} KB.`);
    } catch (err) {
      logger.progressDone();
      client.trackProgress();
      throw mapFtpError('upload', err, {
        client: slug,
        defaultSuggestion: 'Falha ao enviar os arquivos. Verifique espaco em disco, permissoes e conexao.',
      });
    }
  } finally {
    client.close();
  }

  const url = buildPublicUrl(config.domain, slug);

  return {
    success: true,
    client: slug,
    localDir: resolvedLocalDir,
    remoteDir: remoteClientDir,
    filesSent: files.length,
    bytesSent: bytesTotalSent,
    url,
  };
}

module.exports = { deployClient, validateSlug, listFilesRecursive };
