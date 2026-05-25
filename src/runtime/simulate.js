function hasEndpoint(config, path, method) {
  return config.schemas.api.endpoints.some((e) => e.path === path && e.method === method);
}

function simulateExecution(config) {
  const checks = [];

  const endpointChecks = [];
  config.schemas.ui.pages.forEach((page) => {
    (page.dataBindings || []).forEach((b) => {
      const method = b.method || "GET";
      const path = b.fetchFrom || b.submitTo;
      endpointChecks.push({
        name: `ui_binding_${page.id}_${method}_${path}`,
        pass: hasEndpoint(config, path, method),
        reason: hasEndpoint(config, path, method) ? "ok" : "ui references missing endpoint"
      });
    });
  });
  checks.push(...endpointChecks);

  const roles = new Set(config.schemas.auth.roles.map((r) => r.role));
  checks.push({
    name: "auth_has_admin",
    pass: roles.has("admin"),
    reason: roles.has("admin") ? "ok" : "admin role missing"
  });

  const dbTables = new Set(config.schemas.db.tables.map((t) => t.name));
  config.schemas.api.endpoints.forEach((ep) => {
    if (ep.path.startsWith("/contacts")) {
      checks.push({
        name: "contacts_table_exists",
        pass: dbTables.has("contacts"),
        reason: dbTables.has("contacts") ? "ok" : "contacts endpoint without contacts table"
      });
    }
    if (ep.path.startsWith("/billing")) {
      const billingOk = dbTables.has("subscriptions") && dbTables.has("payments");
      checks.push({
        name: "billing_tables_exist",
        pass: billingOk,
        reason: billingOk ? "ok" : "billing endpoints without subscriptions/payments tables"
      });
    }
  });

  const executable = checks.every((c) => c.pass);
  return { executable, checks };
}

module.exports = { simulateExecution };
