const Ajv = require("ajv");
const outputSchema = require("../schemas/outputSchema");

const ajv = new Ajv({ allErrors: true, strict: false });
const validateSchema = ajv.compile(outputSchema);

function ensureArray(obj, key, repairs) {
  if (!Array.isArray(obj[key])) {
    obj[key] = [];
    repairs.push(`Repaired ${key} to empty array.`);
  }
}

function targetedRepair(config) {
  const repairs = [];

  if (!config.meta) {
    config.meta = { version: "1.0.0", pipeline: [], deterministic: true, timestamp: new Date().toISOString() };
    repairs.push("Created missing meta.");
  }

  ensureArray(config, "assumptions", repairs);

  if (!config.schemas) {
    config.schemas = { ui: {}, api: {}, db: {}, auth: {}, business: {} };
    repairs.push("Created missing schemas container.");
  }

  const api = config.schemas.api || {};
  if (!Array.isArray(api.endpoints)) {
    api.endpoints = [];
    repairs.push("Created missing API endpoints array.");
  }
  config.schemas.api = api;

  const ui = config.schemas.ui || {};
  if (!Array.isArray(ui.pages)) {
    ui.pages = [];
    repairs.push("Created missing UI pages array.");
  }
  config.schemas.ui = ui;

  const db = config.schemas.db || {};
  if (!Array.isArray(db.tables)) {
    db.tables = [];
    repairs.push("Created missing DB tables array.");
  }
  if (!Array.isArray(db.relations)) {
    db.relations = [];
    repairs.push("Created missing DB relations array.");
  }
  config.schemas.db = db;

  const tableNames = new Set(db.tables.map((t) => t.name));
  config.schemas.api.endpoints.forEach((ep) => {
    if (ep.path === "/contacts" && !tableNames.has("contacts")) {
      db.tables.push({
        name: "contacts",
        columns: [
          { name: "id", type: "uuid", required: true },
          { name: "owner_user_id", type: "uuid", required: true },
          { name: "name", type: "text", required: true }
        ],
        primaryKey: "id"
      });
      repairs.push("Added missing contacts table required by /contacts endpoint.");
      tableNames.add("contacts");
    }
  });

  return { config, repairs };
}

function validateAndRepair(config) {
  const errors = [];
  const repairLog = [];

  const repaired = targetedRepair(config);
  repairLog.push(...repaired.repairs);

  const valid = validateSchema(repaired.config);
  if (!valid) {
    (validateSchema.errors || []).forEach((err) => {
      errors.push(`${err.instancePath || "/"} ${err.message}`);
    });
  }

  return {
    valid: !!valid,
    repairs: repairLog,
    errors,
    config: repaired.config
  };
}

module.exports = { validateAndRepair };
