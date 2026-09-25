const https = require('https');
const http = require('http');

function checkUrl(url, { timeoutMs = 15000 } = {}) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https:') ? https : http;
    const req = lib.get(url, { timeout: timeoutMs }, (res) => {
      resolve({ ok: res.statusCode >= 200 && res.statusCode < 400, statusCode: res.statusCode });
      res.resume();
    });
    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, statusCode: null, error: 'timeout' });
    });
    req.on('error', (err) => {
      resolve({ ok: false, statusCode: null, error: err.message });
    });
  });
}

module.exports = { checkUrl };
