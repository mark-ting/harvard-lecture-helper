// listen for click
chrome.browserAction.onClicked.addListener(function(tab) {
    // Code for loading CS50 2X, a prerequisite for pausing videos as FlowPlayer is needed
    // get current tab
    // http://stackoverflow.com/a/18436323
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {

        // only inject into all frames for Canvas (which has iframes)
        var allFrames = /:\/\/canvas\.harvard\.edu|cm\.dce\.harvard\.edu\//.test(tabs[0].url);

        // inject extension's JavaScript
        chrome.tabs.executeScript(undefined, {allFrames: true, file: 'lib/jquery-1.11.1.min.js'}, function(results) {
            chrome.tabs.executeScript(undefined, {allFrames: true, file: 'lib/flowplayer.commercial-5.5.0/flowplayer.min.js'}, function(results) {
                chrome.tabs.executeScript(undefined, {allFrames: false, file: 'js/script.js'}, function(results) {
                    chrome.tabs.executeScript(undefined, {allFrames: true, file: 'js/findurl.js'});
                });
                //chrome.tabs.executeScript(undefined, {allFrames: false, file: 'js/script.js'});
            });
        });
    });
    
    // Code specific to pausing video
    // Only works the second time the button is clicked, so the user can use just CS50 2x if they want to, second click pauses video. Either way, timestamp is generated.
    console.log("Injecting video-pausing code...");
    chrome.tabs.executeScript(undefined, {allFrames: false, file: 'js/pausevideo.js'});
    console.log("Injected code!");
});

// add badge to icon
chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 100]});
chrome.browserAction.setBadgeText({text: '2x'});