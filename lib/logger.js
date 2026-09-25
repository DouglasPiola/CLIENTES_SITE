const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

function paint(color, text) {
  if (!process.stdout.isTTY) return text;
  return `${colors[color]}${text}${colors.reset}`;
}

function info(message) {
  console.log(`${paint('cyan', '[info]')} ${message}`);
}

function step(message) {
  console.log(`${paint('cyan', '->')} ${message}`);
}

function success(message) {
  console.log(`${paint('green', '[ok]')} ${message}`);
}

function warn(message) {
  console.log(`${paint('yellow', '[aviso]')} ${message}`);
}

function error(message) {
  console.error(`${paint('red', '[erro]')} ${message}`);
}

function progress(fileName, bytes, bytesOverall) {
  const kb = (bytes / 1024).toFixed(1);
  const totalKb = (bytesOverall / 1024).toFixed(1);
  process.stdout.write(
    `\r${paint('gray', `   enviando: ${fileName} (${kb} KB) | total enviado: ${totalKb} KB`)}\x1b[K`
  );
}

function progressDone() {
  if (process.stdout.isTTY) process.stdout.write('\n');
}

module.exports = { info, step, success, warn, error, progress, progressDone };
