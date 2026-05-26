async function generateCRM() {

    const prompt =
        document.getElementById("prompt").value;

    const output =
        document.getElementById("output");

    output.innerHTML = "Generating CRM architecture...";

    try {

        const response = await fetch("/compile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt
            })
        });

        if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
        }

        const data = await response.json();

        output.innerHTML =
            JSON.stringify(data, null, 2);

    } catch (error) {

        output.innerHTML =
            "Error: " + error.message;
    }
}
