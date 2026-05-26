const { generateConfig } = require("./index");

async function runPipeline(prompt) {
  return generateConfig(prompt);
}

module.exports = runPipeline;
