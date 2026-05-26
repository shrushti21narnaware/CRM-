function repairConfig(config, errors) {

    errors.forEach(error => {

        if (error === "Contacts table missing") {

            config.db_schema.tables.push("contacts");
        }
    });

    return config;
}

module.exports = repairConfig;