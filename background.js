// File: background.js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
        chrome.cookies.getAll({ url: tab.url }, (cookies) => {
            const insecureCookies = cookies.filter(cookie => {
                return !cookie.secure || !cookie.httpOnly || !cookie.sameSite;
            });

            if (insecureCookies.length > 0) {
                console.warn("Insecure cookies detected:", insecureCookies);
                chrome.action.setBadgeText({ text: "!", tabId });
                chrome.action.setBadgeBackgroundColor({ color: "#FF0000", tabId });
            } else {
                chrome.action.setBadgeText({ text: "", tabId });
            }
        });
    }
});