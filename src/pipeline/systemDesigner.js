function designSystem(intent) {

    return {

        entities: [
            "users",
            "contacts",
            "subscriptions"
        ],

        pages: [
            "Login",
            "Dashboard",
            "Analytics"
        ],

        permissions: {

            admin: [
                "analytics",
                "manage_users"
            ],

            user: [
                "contacts"
            ]
        }
    };
}

module.exports = designSystem;