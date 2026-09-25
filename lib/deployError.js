class DeployError extends Error {
  constructor(stage, message, { client, file, suggestion, cause } = {}) {
    super(message);
    this.name = 'DeployError';
    this.stage = stage;
    this.client = client;
    this.file = file || null;
    this.suggestion = suggestion || null;
    this.cause = cause || null;
  }
}

module.exports = { DeployError };
