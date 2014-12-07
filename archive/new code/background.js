/*// get current tab
// http://stackoverflow.com/a/18436323
chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {

    // only inject into all frames for Canvas (which has iframes)
    var allFrames = /:\/\/canvas\.harvard\.edu|cm\.dce\.harvard\.edu\//.test(tabs[0].url);

    // inject extension's JavaScript
    chrome.tabs.executeScript(undefined, {allFrames: true, file: 'chrome-extension://hgmddncbkbggaeofkbdcjbihmgogldjp/lib/jquery-1.11.1.min.js'}, function(results) {
        chrome.tabs.executeScript(undefined, {allFrames: true, file: 'chrome-extension://hgmddncbkbggaeofkbdcjbihmgogldjp/lib/flowplayer.commercial-5.5.0/flowplayer.min.js'}, function(results) {
            chrome.tabs.executeScript(undefined, {allFrames: false, file: 'chrome-extension://hgmddncbkbggaeofkbdcjbihmgogldjp/js/script.js'}, function(results) {
                chrome.tabs.executeScript(undefined, {allFrames: true, file: 'chrome-extension://hgmddncbkbggaeofkbdcjbihmgogldjp/js/findurl.js'});
            });
            //chrome.tabs.executeScript(undefined, {allFrames: false, file: 'js/script.js'});
        });
    });
});


// add badge to icon
chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 100]});
chrome.browserAction.setBadgeText({text: '2x'});*/


chrome.browserAction.onClicked.addListener(function (tab) {
    console.log("Running CS50 2x...");
    
    // get current tab
    // http://stackoverflow.com/a/18436323
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {

        // only inject into all frames for Canvas (which has iframes)
        var allFrames = /:\/\/canvas\.harvard\.edu|cm\.dce\.harvard\.edu\//.test(tabs[0].url);

        // inject extension's JavaScript
        chrome.tabs.executeScript(undefined, {allFrames: true, file: 'CS50 2x/2.2.6_0/lib/jquery-1.11.1.min.js'}, function(results) {
            chrome.tabs.executeScript(undefined, {allFrames: true, file: 'CS50 2x/2.2.6_0/lib/flowplayer.commercial-5.5.0/flowplayer.min.js'}, function(results) {
                chrome.tabs.executeScript(undefined, {allFrames: false, file: 'CS50 2x/2.2.6_0/js/script.js'}, function(results) {
                    chrome.tabs.executeScript(undefined, {allFrames: true, file: 'CS50 2x/2.2.6_0/js/findurl.js'});
                });
                //chrome.tabs.executeScript(undefined, {allFrames: false, file: 'js/script.js'});
            });
        });
    });
    
    /*console.log("Injecting video-pausing code...");
   //  chrome.tabs.executeScript(null, {file: 'chrome-extension://nggoedgfpnlmnmkjmllmpcfgflanilih/script.js'});
    chrome.tabs.executeScript(undefined, {allFrames: true, file: 'js/jquery-1.11.1.min.js'}, function(results) {
        chrome.tabs.executeScript(null, {file: "scripts.js"
                                        });
    });
    console.log("Injected code!");*/
});