function refine(output) {
  const changes = [];
  const warnings = [];

  const endpointSet = new Set(output.schemas.api.endpoints.map((e) => `${e.method} ${e.path}`));

  output.schemas.ui.pages.forEach((page) => {
    (page.dataBindings || []).forEach((binding) => {
      const method = binding.method || "GET";
      const path = binding.fetchFrom || binding.submitTo;
      const key = `${method} ${path}`;
      if (!endpointSet.has(key)) {
        warnings.push(`Missing API endpoint for UI binding: ${key}`);
      }
    });
  });

  const hasAnalyticsPage = output.schemas.ui.pages.some((p) => p.id === "analytics");
  const hasAnalyticsEndpoint = output.schemas.api.endpoints.some((e) => e.path === "/analytics/overview");
  if (hasAnalyticsPage && !hasAnalyticsEndpoint) {
    output.schemas.api.endpoints.push({
      path: "/analytics/overview",
      method: "GET",
      request: {},
      response: { totals: "object" },
      auth: "required",
      permission: "analytics:read"
    });
    changes.push("Added missing analytics endpoint required by analytics page.");
  }

  output.schemas.db.relations = output.schemas.db.relations.filter((r) => {
    const [table] = r.from.split(".");
    const exists = output.schemas.db.tables.some((t) => t.name === table);
    if (!exists) changes.push(`Removed relation for absent table: ${r.from}`);
    return exists;
  });

  output.refinement = { changes, warnings };
  return output;
}

module.exports = { refine };
