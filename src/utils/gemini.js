const { GoogleGenerativeAI } =
require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error(
        "Missing GEMINI_API_KEY environment variable"
    );
}

const genAI =
new GoogleGenerativeAI(apiKey);

const model =
genAI.getGenerativeModel({

    model: "gemini-1.5-flash",

    generationConfig: {

        temperature: 0
    }
});

module.exports = model;
