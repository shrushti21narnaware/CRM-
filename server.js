const runPipeline =
require("./src/pipeline/orchestrator");

app.post("/compile", async (req, res) => {

    try {

        const { prompt } = req.body;

        const result =
            await runPipeline(prompt);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });
    }
});