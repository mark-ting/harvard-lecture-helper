chrome.browserAction.onClicked.addListener(function (tab) {
    console.log("Injecting code...");
    chrome.tabs.executeScript(null, {file: "scripts.js"});
    console.log("Injected code!");
});