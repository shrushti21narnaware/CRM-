async function generateCRM() {

    const prompt = document.getElementById("prompt").value;

    const output = document.getElementById("output");

    output.innerHTML = "Generating...";

    try {

        const response = await fetch(
            "https://crm-compiler.onrender.com/compile",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt })
            }
        );

        const data = await response.json();

        output.innerHTML =
            JSON.stringify(data, null, 2);

    } catch (error) {

        output.innerHTML = error.message;
    }
}