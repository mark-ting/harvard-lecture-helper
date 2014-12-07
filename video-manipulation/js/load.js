document.getElementById('cs50').addEventListener("click", function () {
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
});

document.getElementById('gettime').addEventListener("click", function () {
    console.log("Injecting video-pausing code...");
    chrome.tabs.executeScript(undefined, {allFrames: false, file: 'js/pausevideo.js'});
});


document.getElementById('resumeplayback').addEventListener("click", function () {
    console.log("Resuming playback...");
    chrome.tabs.executeScript(undefined, {allFrames: false, file: 'js/resumeplayback.js'});
});