const { generateConfig } = require("../src/pipeline");

function runSmoke() {
  const prompt =
    "Build a CRM with login, contacts, dashboard, role-based access, analytics, and premium plans.";
  const result = generateConfig(prompt);

  const checks = [
    typeof result === "object",
    !!result.schemas,
    !!result.schemas.api,
    Array.isArray(result.schemas.api.endpoints),
    result.validation.valid === true,
    result.execution.executable === true
  ];

  if (checks.every(Boolean)) {
    console.log("Smoke test passed.");
    process.exit(0);
  }

  console.error("Smoke test failed.", {
    validation: result.validation,
    execution: result.execution
  });
  process.exit(1);
}

runSmoke();
