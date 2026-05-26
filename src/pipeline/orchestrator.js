const extractIntent =
require("./intentExtractor");

const designSystem =
require("./systemDesigner");

const generateSchemas =
require("./schemaGenerator");

const validateSchemas =
require("./validator");

const repairConfig =
require("./repairEngine");

const simulateRuntime =
require("./runtimeSimulator");

async function runPipeline(prompt) {

    const intent =
        extractIntent(prompt);

    const design =
        designSystem(intent);

    let config =
        generateSchemas(design);

    const validation =
        validateSchemas(config);

    if (!validation.valid) {

        config =
            repairConfig(
                config,
                validation.errors
            );
    }

    const runtime =
        simulateRuntime(config);

    return {

        intent,

        design,

        config,

        runtime
    };
}

module.exports = runPipeline;
