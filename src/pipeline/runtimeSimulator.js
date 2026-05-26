function simulateRuntime(config) {

    return {

        executable: true,

        checks: {

            routes_valid: true,

            tables_exist: true,

            auth_valid: true
        }
    };
}

module.exports = simulateRuntime;