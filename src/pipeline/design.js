function buildDesign(intent) {
  const entities = [
    { name: "users", fields: ["id", "email", "password_hash", "role", "created_at"] },
    { name: "sessions", fields: ["id", "user_id", "token", "expires_at"] }
  ];

  if (intent.features.includes("contacts")) {
    entities.push({ name: "contacts", fields: ["id", "owner_user_id", "name", "email", "phone", "company", "created_at"] });
  }

  if (intent.features.includes("payments") || intent.features.includes("premium_plan")) {
    entities.push({ name: "plans", fields: ["id", "name", "price", "interval", "is_premium"] });
    entities.push({ name: "subscriptions", fields: ["id", "user_id", "plan_id", "status", "current_period_end"] });
    entities.push({ name: "payments", fields: ["id", "user_id", "amount", "currency", "status", "provider_ref", "created_at"] });
  }

  if (intent.features.includes("analytics")) {
    entities.push({ name: "analytics_events", fields: ["id", "user_id", "event_name", "event_payload", "created_at"] });
  }

  const flows = [
    { name: "auth_login", steps: ["submit_credentials", "validate", "issue_session"] }
  ];

  if (intent.features.includes("contacts")) {
    flows.push({ name: "contact_crud", steps: ["create", "read", "update", "delete"] });
  }
  if (intent.features.includes("premium_plan")) {
    flows.push({ name: "premium_gating", steps: ["check_subscription", "allow_or_deny"] });
  }

  const roleMatrix = intent.roles.map((role) => {
    const base = { role, permissions: ["profile:read"] };
    if (role === "admin") base.permissions.push("analytics:read", "users:manage", "roles:manage");
    if (intent.features.includes("contacts")) {
      base.permissions.push(role === "admin" ? "contacts:all" : "contacts:own");
    }
    if (role !== "admin" && intent.features.includes("premium_plan")) {
      base.permissions.push("premium:access_if_active");
    }
    return base;
  });

  return { entities, flows, roleMatrix };
}

module.exports = { buildDesign };
