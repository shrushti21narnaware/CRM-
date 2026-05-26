function validateSchemas(config) {

    const errors = [];

    if (!config.ui_schema) {
        errors.push("Missing UI schema");
    }

    if (!config.api_schema) {
        errors.push("Missing API schema");
    }

    if (!config.db_schema.tables.includes("contacts")) {
        errors.push("Contacts table missing");
    }

    return {

        valid: errors.length === 0,

        errors
    };
}

module.exports = validateSchemas;