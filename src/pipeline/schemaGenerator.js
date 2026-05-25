function toColumnType(field) {
  if (field.endsWith("_id") || field === "id") return "uuid";
  if (field.includes("price") || field.includes("amount")) return "decimal";
  if (field.includes("at") || field.includes("expires")) return "timestamp";
  if (field.includes("payload")) return "json";
  if (field === "is_premium") return "boolean";
  return "text";
}

function buildDbSchema(design) {
  return {
    tables: design.entities.map((entity) => ({
      name: entity.name,
      columns: entity.fields.map((field) => ({ name: field, type: toColumnType(field), required: field !== "id" })),
      primaryKey: "id"
    })),
    relations: [
      { from: "sessions.user_id", to: "users.id" },
      { from: "contacts.owner_user_id", to: "users.id", optional: true },
      { from: "subscriptions.user_id", to: "users.id", optional: true },
      { from: "subscriptions.plan_id", to: "plans.id", optional: true },
      { from: "payments.user_id", to: "users.id", optional: true },
      { from: "analytics_events.user_id", to: "users.id", optional: true }
    ]
  };
}

function buildApiSchema(intent, design) {
  const endpoints = [
    {
      path: "/auth/login",
      method: "POST",
      request: { email: "string", password: "string" },
      response: { token: "string", user: "object" },
      auth: "public"
    }
  ];

  if (intent.features.includes("contacts")) {
    endpoints.push(
      {
        path: "/contacts",
        method: "GET",
        request: {},
        response: { items: "array" },
        auth: "required",
        permission: "contacts:own|contacts:all"
      },
      {
        path: "/contacts",
        method: "POST",
        request: { name: "string", email: "string", phone: "string", company: "string" },
        response: { id: "uuid" },
        auth: "required",
        permission: "contacts:own|contacts:all"
      }
    );
  }

  if (intent.features.includes("analytics")) {
    endpoints.push({
      path: "/analytics/overview",
      method: "GET",
      request: {},
      response: { totals: "object" },
      auth: "required",
      permission: "analytics:read"
    });
  }

  if (intent.features.includes("payments") || intent.features.includes("premium_plan")) {
    endpoints.push(
      {
        path: "/billing/subscribe",
        method: "POST",
        request: { plan_id: "uuid", payment_method_token: "string" },
        response: { subscription_id: "uuid", status: "string" },
        auth: "required"
      },
      {
        path: "/billing/webhook",
        method: "POST",
        request: { provider_ref: "string", status: "string" },
        response: { ok: "boolean" },
        auth: "public"
      }
    );
  }

  return { endpoints, style: "resource_oriented", version: "v1", entities: design.entities.map((e) => e.name) };
}

function buildUiSchema(intent) {
  const pages = [
    {
      id: "login",
      route: "/login",
      layout: "auth",
      components: ["email_input", "password_input", "submit_button"],
      dataBindings: [{ submitTo: "/auth/login", method: "POST" }]
    }
  ];

  if (intent.features.includes("dashboard")) {
    pages.push({
      id: "dashboard",
      route: "/dashboard",
      layout: "app_shell",
      components: ["kpi_cards", "activity_feed"],
      guards: ["authenticated"]
    });
  }

  if (intent.features.includes("contacts")) {
    pages.push({
      id: "contacts",
      route: "/contacts",
      layout: "app_shell",
      components: ["contacts_table", "contact_form_modal"],
      dataBindings: [
        { fetchFrom: "/contacts", method: "GET" },
        { submitTo: "/contacts", method: "POST" }
      ],
      guards: ["authenticated", "permission:contacts:own|contacts:all"]
    });
  }

  if (intent.features.includes("analytics")) {
    pages.push({
      id: "analytics",
      route: "/analytics",
      layout: "app_shell",
      components: ["charts", "filters"],
      dataBindings: [{ fetchFrom: "/analytics/overview", method: "GET" }],
      guards: ["authenticated", "permission:analytics:read"]
    });
  }

  if (intent.features.includes("premium_plan")) {
    pages.push({
      id: "billing",
      route: "/billing",
      layout: "app_shell",
      components: ["plan_cards", "subscribe_button"],
      dataBindings: [{ submitTo: "/billing/subscribe", method: "POST" }],
      guards: ["authenticated"]
    });
  }

  return { pages, theme: "clean-enterprise", navigation: pages.map((p) => ({ id: p.id, route: p.route })) };
}

function buildAuthSchema(design) {
  return {
    strategy: "session_token",
    roles: design.roleMatrix,
    permissionModel: "rbac",
    loginEndpoint: "/auth/login"
  };
}

function buildBusinessRules(intent) {
  const rules = [];
  if (intent.features.includes("premium_plan")) {
    rules.push({
      id: "premium_gating",
      when: "user.subscription.status != active",
      effect: "deny premium endpoints and pages",
      appliesTo: ["/premium/*", "/analytics"]
    });
  }
  if (intent.features.includes("analytics")) {
    rules.push({
      id: "analytics_admin_only",
      when: "user.role != admin",
      effect: "deny access",
      appliesTo: ["/analytics/overview", "/analytics"]
    });
  }
  return { rules };
}

function buildSchemas(intent, design) {
  return {
    ui: buildUiSchema(intent),
    api: buildApiSchema(intent, design),
    db: buildDbSchema(design),
    auth: buildAuthSchema(design),
    business: buildBusinessRules(intent)
  };
}

module.exports = { buildSchemas };
