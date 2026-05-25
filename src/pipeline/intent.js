function unique(arr) {
  return [...new Set(arr)];
}

function extractIntent(prompt) {
  const text = (prompt || "").toLowerCase();
  const features = [];
  const roles = [];
  const constraints = [];
  const assumptions = [];
  const unknowns = [];

  const featureMap = [
    ["login", "authentication"],
    ["signup", "registration"],
    ["contact", "contacts"],
    ["dashboard", "dashboard"],
    ["payment", "payments"],
    ["premium", "premium_plan"],
    ["analytics", "analytics"],
    ["role", "rbac"],
    ["report", "reporting"]
  ];

  featureMap.forEach(([needle, normalized]) => {
    if (text.includes(needle)) features.push(normalized);
  });

  const roleMap = ["admin", "manager", "agent", "user", "customer", "viewer"];
  roleMap.forEach((role) => {
    if (text.includes(role)) roles.push(role);
  });

  if (text.includes("crm")) constraints.push("domain:crm");
  if (text.includes("gdpr")) constraints.push("compliance:gdpr");
  if (text.includes("hipaa")) constraints.push("compliance:hipaa");
  if (text.includes("multi tenant") || text.includes("multitenant")) constraints.push("architecture:multi_tenant");

  if (!features.includes("authentication")) {
    assumptions.push("Added authentication because secure app access is expected.");
    features.push("authentication");
  }

  if (roles.length === 0) {
    assumptions.push("Default roles applied: admin and user.");
    roles.push("admin", "user");
  }

  if (!text.includes("payment") && features.includes("premium_plan")) {
    assumptions.push("Added payments because premium plan implies billing.");
    features.push("payments");
  }

  if (!text.includes("timezone")) unknowns.push("timezone_for_reporting");
  if (!text.includes("currency") && features.includes("payments")) unknowns.push("billing_currency");

  const productType = text.includes("crm") ? "crm" : "web_app";

  return {
    productType,
    features: unique(features).sort(),
    roles: unique(roles).sort(),
    constraints: unique(constraints).sort(),
    unknowns: unique(unknowns).sort(),
    assumptions
  };
}

module.exports = { extractIntent };
