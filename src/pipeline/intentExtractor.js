function extractIntent(prompt) {

    return {
        app_type: "CRM",

        features: [
            "login",
            "contacts",
            "dashboard",
            "payments",
            "analytics"
        ],

        roles: [
            "admin",
            "user"
        ]
    };
}

module.exports = extractIntent;
if (prompt.length < 10) {

    return {

        clarification_needed: true,

        questions: [
            "What type of app?",
            "What features are needed?"
        ]
    };
}