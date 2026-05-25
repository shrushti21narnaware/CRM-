module.exports = {
  type: "object",
  additionalProperties: false,
  required: ["meta", "assumptions", "intent", "design", "schemas", "refinement", "validation", "execution"],
  properties: {
    meta: {
      type: "object",
      additionalProperties: false,
      required: ["version", "pipeline", "deterministic", "timestamp"],
      properties: {
        version: { type: "string" },
        pipeline: { type: "array", items: { type: "string" }, minItems: 4 },
        deterministic: { type: "boolean" },
        timestamp: { type: "string" }
      }
    },
    assumptions: { type: "array", items: { type: "string" } },
    intent: {
      type: "object",
      required: ["productType", "features", "roles", "constraints"],
      properties: {
        productType: { type: "string" },
        features: { type: "array", items: { type: "string" } },
        roles: { type: "array", items: { type: "string" } },
        constraints: { type: "array", items: { type: "string" } },
        unknowns: { type: "array", items: { type: "string" } }
      }
    },
    design: {
      type: "object",
      required: ["entities", "flows", "roleMatrix"],
      properties: {
        entities: { type: "array", items: { type: "object" } },
        flows: { type: "array", items: { type: "object" } },
        roleMatrix: { type: "array", items: { type: "object" } }
      }
    },
    schemas: {
      type: "object",
      required: ["ui", "api", "db", "auth", "business"],
      properties: {
        ui: { type: "object" },
        api: { type: "object" },
        db: { type: "object" },
        auth: { type: "object" },
        business: { type: "object" }
      }
    },
    refinement: {
      type: "object",
      required: ["changes", "warnings"],
      properties: {
        changes: { type: "array", items: { type: "string" } },
        warnings: { type: "array", items: { type: "string" } }
      }
    },
    validation: {
      type: "object",
      required: ["valid", "repairs", "errors"],
      properties: {
        valid: { type: "boolean" },
        repairs: { type: "array", items: { type: "string" } },
        errors: { type: "array", items: { type: "string" } }
      }
    },
    execution: {
      type: "object",
      required: ["executable", "checks"],
      properties: {
        executable: { type: "boolean" },
        checks: { type: "array", items: { type: "object" } }
      }
    }
  }
};
