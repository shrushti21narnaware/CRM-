function extractIntent(prompt) {

    // Handle vague prompts

    if (!prompt || prompt.length < 10) {

        return {

            clarification_needed: true,

            questions: [
                "What type of app do you want?",
                "What features should the app contain?"
            ]
        };
    }

    // Convert prompt into structured intent

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