const path = require('path');
const { loadConfig } = require('./config');
const { deployClient } = require('../lib/ftpDeployer');
const { checkUrl } = require('../lib/httpCheck');
const { DeployError } = require('../lib/deployError');

const CLIENTES_DIR = path.resolve(__dirname, '..', 'clientes');

function defaultLocalDirFor(slug) {
  return path.join(CLIENTES_DIR, slug);
}

/**
 * Publica um cliente na Hostinger e verifica se a URL responde.
 * Ponto de entrada unico pensado para ser reutilizado por CLI, scripts
 * e futuramente por botoes/API do Agency OS.
 */
async function publishClient(slug, options = {}) {
  const config = loadConfig();
  const localDir = options.localDir || defaultLocalDirFor(slug);

  const deployResult = await deployClient(slug, localDir, config, {
    onProgress: options.onProgress,
  });

  let verification = null;
  if (options.verify !== false) {
    verification = await checkUrl(deployResult.url);
  }

  return { ...deployResult, verification };
}

module.exports = { publishClient, defaultLocalDirFor, CLIENTES_DIR, DeployError };
