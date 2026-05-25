const { extractIntent } = require("./intent");
const { buildDesign } = require("./design");
const { buildSchemas } = require("./schemaGenerator");
const { refine } = require("./refiner");
const { validateAndRepair } = require("../repair/validator");
const { simulateExecution } = require("../runtime/simulate");

function generateConfig(prompt) {
  const intentRaw = extractIntent(prompt);

  const output = {
    meta: {
      version: "1.0.0",
      pipeline: ["intent_extraction", "system_design", "schema_generation", "refinement", "validation_repair", "execution_simulation"],
      deterministic: true,
      timestamp: new Date().toISOString()
    },
    assumptions: intentRaw.assumptions,
    intent: {
      productType: intentRaw.productType,
      features: intentRaw.features,
      roles: intentRaw.roles,
      constraints: intentRaw.constraints,
      unknowns: intentRaw.unknowns
    },
    design: buildDesign(intentRaw),
    schemas: {},
    refinement: { changes: [], warnings: [] },
    validation: { valid: false, repairs: [], errors: [] },
    execution: { executable: false, checks: [] }
  };

  output.schemas = buildSchemas(intentRaw, output.design);
  refine(output);

  const validation = validateAndRepair(output);
  output.validation = {
    valid: validation.valid,
    repairs: validation.repairs,
    errors: validation.errors
  };

  output.execution = simulateExecution(validation.config);
  output.validation.valid = output.validation.valid && output.execution.executable;

  return output;
}

module.exports = { generateConfig };
