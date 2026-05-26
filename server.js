const express = require("express");
const cors = require("cors");
const path = require("path");

const { generateConfig } = require("./src/pipeline");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "frontend")));

app.post("/compile", async (req, res) => {

    try {

        const { prompt } = req.body;

        if (!prompt) {

            return res.status(400).json({

                error: "Prompt is required"
            });
        }

        const result =
            await generateConfig(prompt);

        res.json(result);

    } catch (error) {

        res.status(500).json({

            error: error.message
        });
    }
});

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );
});
