const fs = require("fs");
const path = require("path");
const { generateConfig } = require("../pipeline");

function loadJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function runEvaluation() {
  const promptsPath = path.join(__dirname, "prompts.json");
  const edgeCasesPath = path.join(__dirname, "edgeCases.json");

  const prompts = loadJson(promptsPath);
  const edgeCases = loadJson(edgeCasesPath);
  const allCases = [...prompts, ...edgeCases];

  let success = 0;
  let totalRepairs = 0;
  const failures = [];
  const latencies = [];

  allCases.forEach((prompt) => {
    const start = Date.now();
    try {
      const result = generateConfig(prompt);
      const latencyMs = Date.now() - start;
      latencies.push(latencyMs);

      totalRepairs += (result.validation.repairs || []).length;
      if (result.validation.valid && result.execution.executable) {
        success += 1;
      } else {
        failures.push({
          prompt,
          errors: result.validation.errors
        });
      }
    } catch (error) {
      latencies.push(Date.now() - start);
      failures.push({
        prompt,
        errors: [error.message]
      });
    }
  });

  const avgLatencyMs =
    latencies.length === 0
      ? 0
      : Math.round(
          latencies.reduce((a, b) => a + b, 0) / latencies.length
        );

  return {
    total_cases: allCases.length,
    success_count: success,
    success_rate: `${Math.round((success / allCases.length) * 100)}%`,
    average_latency_ms: avgLatencyMs,
    repair_count: totalRepairs,
    failures
  };
}

module.exports = { runEvaluation };
