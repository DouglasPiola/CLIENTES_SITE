const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

function required(name) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(
      `Variavel de ambiente obrigatoria ausente ou vazia: ${name}. ` +
      `Configure-a no arquivo .env na raiz do projeto (veja .env.example).`
    );
  }
  return value.trim();
}

function parseBoolean(value, fallback) {
  if (value === undefined || value === null || value === '') return fallback;
  return ['true', '1', 'yes', 'on'].includes(String(value).trim().toLowerCase());
}

function stripTrailingSlash(value) {
  return value.replace(/\/+$/, '');
}

function loadConfig() {
  return {
    ftp: {
      host: required('FTP_HOST'),
      port: parseInt(process.env.FTP_PORT || '21', 10),
      user: required('FTP_USER'),
      password: required('FTP_PASSWORD'),
      secure: parseBoolean(process.env.FTP_SECURE, true),
      rejectUnauthorized: parseBoolean(process.env.FTP_TLS_REJECT_UNAUTHORIZED, true),
      remoteRoot: '/' + stripTrailingSlash(process.env.FTP_REMOTE_ROOT || '/public_html').replace(/^\/+/, ''),
    },
    domain: stripTrailingSlash(process.env.PUBLIC_DOMAIN || 'https://agenciaautoflow.com.br'),
  };
}

module.exports = { loadConfig };
