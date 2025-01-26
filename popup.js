// File: popup.js
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    chrome.cookies.getAll({ url: tab.url }, (cookies) => {
        const content = document.getElementById("content");
        content.innerHTML = "";

        if (cookies.length === 0) {
            content.innerHTML = "<p>No cookies found.</p>";
            return;
        }

        cookies.forEach(cookie => {
            const div = document.createElement("div");
            div.className = "cookie";

            let warnings = [];
            if (!cookie.secure) warnings.push("Secure flag missing");
            if (!cookie.httpOnly) warnings.push("HttpOnly flag missing");
            if (!cookie.sameSite) warnings.push("SameSite flag missing");

            div.innerHTML = `<strong>${cookie.name}</strong>: ${warnings.length > 0 ? warnings.join(", ") : "All flags set"}`;
            if (warnings.length > 0) {
                div.classList.add("warning");
            }

            content.appendChild(div);
        });
    });
});
