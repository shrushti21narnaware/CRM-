const { runEvaluation } = require("../src/evaluation/runEvaluation");

function main() {
  const summary = runEvaluation();
  console.log(JSON.stringify(summary, null, 2));
}

main();
