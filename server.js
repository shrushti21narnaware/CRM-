const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* Serve Frontend Files */

app.use(express.static(path.join(__dirname, "frontend")));

/* Home Route */

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

/* API Route */

app.post("/compile", async (req, res) => {

    try {

        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                error: "Prompt is required"
            });
        }

        const result = {
            ui_schema: {
                pages: [
                    "Login",
                    "Dashboard",
                    "Contacts",
                    "Analytics"
                ]
            },

            api_schema: {
                endpoints: [
                    "/login",
                    "/contacts",
                    "/payments"
                ]
            },

            database_schema: {
                tables: [
                    "users",
                    "contacts",
                    "subscriptions"
                ]
            },

            auth_system: {
                roles: [
                    "admin",
                    "user"
                ]
            },

            business_logic: [
                "Premium users can access analytics",
                "Admins manage users"
            ]
        };

        res.json({
            success: true,
            result
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});