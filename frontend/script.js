const ui = {
    prompt: document.getElementById("prompt"),
    output: document.getElementById("output"),
    outputPanel: document.getElementById("outputPanel"),
    statusText: document.getElementById("statusText"),
    generateBtn: document.getElementById("generateBtn"),
    clearBtn: document.getElementById("clearBtn"),
    copyBtn: document.getElementById("copyBtn"),
    downloadBtn: document.getElementById("downloadBtn"),
    heroTitle: document.getElementById("heroTitle"),
    heroSubtitle: document.getElementById("heroSubtitle"),
    modeLabel: document.getElementById("currentModeLabel")
};

const modeContent = {
    apps: {
        title: "Turn your ideas into apps",
        subtitle: "Build CRM systems using AI-generated schemas, APIs, authentication, dashboards and workflows.",
        label: "Apps Mode"
    },
    agents: {
        title: "Design AI superagents for teams",
        subtitle: "Create assistants that orchestrate workflows, monitor events, and automate customer operations end-to-end.",
        label: "Superagents Mode"
    }
};

let latestJson = "";

function setStatus(text) {
    ui.statusText.textContent = text;
}

function setMode(modeKey) {
    const mode = modeContent[modeKey];
    if (!mode) {
        return;
    }

    ui.heroTitle.textContent = mode.title;
    ui.heroSubtitle.textContent = mode.subtitle;
    ui.modeLabel.textContent = mode.label;

    document.querySelectorAll(".tab").forEach((tab) => {
        const isActive = tab.dataset.mode === modeKey;
        tab.classList.toggle("active-tab", isActive);
        tab.setAttribute("aria-selected", String(isActive));
    });
}

function renderOutput(data) {
    latestJson = JSON.stringify(data, null, 2);
    ui.output.textContent = latestJson;
    ui.outputPanel.classList.remove("hidden");
}

async function generateCRM() {
    const prompt = ui.prompt.value.trim();
    if (!prompt) {
        setStatus("Please enter a prompt first.");
        ui.prompt.focus();
        return;
    }

    ui.generateBtn.disabled = true;
    ui.generateBtn.textContent = "Generating...";
    setStatus("Generating CRM architecture...");

    try {
        const response = await fetch("/compile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
        }

        const data = await response.json();
        renderOutput(data);
        setStatus("Done. You can copy or download the result.");
    } catch (error) {
        latestJson = "";
        ui.output.textContent = "Error: " + error.message;
        ui.outputPanel.classList.remove("hidden");
        setStatus("Request failed. Please try again.");
    } finally {
        ui.generateBtn.disabled = false;
        ui.generateBtn.textContent = "Generate";
    }
}

function clearAll() {
    ui.prompt.value = "";
    latestJson = "";
    ui.output.textContent = "";
    ui.outputPanel.classList.add("hidden");
    setStatus("Ready");
    ui.prompt.focus();
}

async function copyOutput() {
    if (!latestJson) {
        setStatus("Nothing to copy yet.");
        return;
    }

    await navigator.clipboard.writeText(latestJson);
    setStatus("Copied to clipboard.");
}

function downloadOutput() {
    if (!latestJson) {
        setStatus("Nothing to download yet.");
        return;
    }

    const blob = new Blob([latestJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "crm-architecture.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus("Downloaded crm-architecture.json");
}

document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        setMode(tab.dataset.mode);
    });
});

document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
        ui.prompt.value = chip.textContent + ". Include data models, API routes, and role-based permissions.";
        ui.prompt.focus();
        setStatus("Prompt inserted. Edit it and generate.");
    });
});

ui.generateBtn.addEventListener("click", generateCRM);
ui.clearBtn.addEventListener("click", clearAll);
ui.copyBtn.addEventListener("click", copyOutput);
ui.downloadBtn.addEventListener("click", downloadOutput);

ui.prompt.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        generateCRM();
    }
});

setMode("apps");
