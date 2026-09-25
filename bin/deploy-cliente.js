#!/usr/bin/env node
const path = require('path');
const { publishClient, defaultLocalDirFor } = require('../src/deploy');
const { DeployError } = require('../lib/deployError');
const logger = require('../lib/logger');

function printUsage() {
  console.log('Uso: node bin/deploy-cliente.js <slug-do-cliente> [caminho-da-pasta]');
  console.log('Exemplo: node bin/deploy-cliente.js proposta-cliente');
  console.log('Exemplo: node bin/deploy-cliente.js proposta-cliente ./clientes/proposta-cliente');
}

async function main() {
  const [, , slug, customPath] = process.argv;

  if (!slug || slug === '-h' || slug === '--help') {
    printUsage();
    process.exit(slug ? 0 : 1);
  }

  const localDir = customPath ? path.resolve(customPath) : defaultLocalDirFor(slug);

  logger.info(`Iniciando deploy do cliente "${slug}"`);
  logger.info(`Pasta local: ${localDir}`);

  try {
    const result = await publishClient(slug, { localDir });

    logger.success(`Deploy concluido para "${slug}".`);
    logger.info(`Diretorio remoto: ${result.remoteDir}`);
    logger.info(`Arquivos enviados: ${result.filesSent}`);
    logger.info(`URL publica: ${result.url}`);

    if (result.verification) {
      if (result.verification.ok) {
        logger.success(`Verificacao HTTP OK (status ${result.verification.statusCode}).`);
      } else {
        logger.warn(
          `Deploy concluido, mas a verificacao HTTP falhou (status: ${result.verification.statusCode || 'sem resposta'}` +
          `${result.verification.error ? `, erro: ${result.verification.error}` : ''}). ` +
          `O DNS/propagacao ou configuracao do dominio pode precisar de mais tempo.`
        );
      }
    }

    console.log('');
    console.log('===================================================');
    console.log(` CLIENTE: ${slug}`);
    console.log(` STATUS:  DEPLOY CONCLUIDO COM SUCESSO`);
    console.log(` URL:     ${result.url}`);
    console.log('===================================================');
    process.exit(0);
  } catch (err) {
    if (err instanceof DeployError) {
      console.log('');
      console.log('===================================================');
      console.log(' STATUS:  DEPLOY FALHOU');
      console.log(` CLIENTE: ${err.client || slug}`);
      console.log(` ETAPA:   ${err.stage}`);
      if (err.file) console.log(` ARQUIVO: ${err.file}`);
      console.log(` ERRO:    ${err.message}`);
      if (err.suggestion) console.log(` SOLUCAO: ${err.suggestion}`);
      console.log('===================================================');
    } else {
      logger.error(`Erro inesperado durante o deploy de "${slug}": ${err.message}`);
      console.error(err.stack);
    }
    process.exit(1);
  }
}

main();
