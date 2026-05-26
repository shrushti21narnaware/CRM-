const { validateAndRepair } = require("../repair/validator");

function validateSchemas(config) {
  const shaped = {
    meta: {
      version: "1.0.0",
      pipeline: ["legacy_orchestrator"],
      deterministic: true,
      timestamp: new Date().toISOString()
    },
    assumptions: [],
    intent: {
      productType: "legacy",
      features: [],
      roles: [],
      constraints: [],
      unknowns: []
    },
    design: { entities: [], flows: [], roleMatrix: [] },
    schemas: config,
    refinement: { changes: [], warnings: [] },
    validation: { valid: false, repairs: [], errors: [] },
    execution: { executable: false, checks: [] }
  };

  const result = validateAndRepair(shaped);
  return {
    valid: result.valid,
    errors: result.errors
  };
}

module.exports = validateSchemas;
