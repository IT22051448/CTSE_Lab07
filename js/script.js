document.getElementById("checkBtn").addEventListener("click", async function () {
    const gatewayUrlInput = document.getElementById("gatewayUrl");
    const output = document.getElementById("output");

    let baseUrl = gatewayUrlInput.value.trim();

    if (!baseUrl) {
        output.textContent = "Please enter the gateway URL.";
        return;
    }

    if (baseUrl.endsWith("/")) {
        baseUrl = baseUrl.slice(0, -1);
    }

    const healthUrl = baseUrl + "/health";
    output.textContent = "Sending request to: " + healthUrl;

    try {
        const response = await fetch(healthUrl);
        const text = await response.text();

        output.textContent =
            "Status: " + response.status + "\n\n" + text;
    } catch (error) {
        output.textContent =
            "Request failed.\n\nThis may happen if the gateway is not running or CORS is not enabled.\n\n" +
            error;
    }
});