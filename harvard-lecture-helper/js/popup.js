/*global $, jQuery, alert*/

$(document).ready(function () {
    "use strict";

    // listener for notepad window
    $('#notepad').click(function () {
         chrome.windows.create({url: "notepad.html"});
    });

    // listener for CS50 2x extension code (Thanks David!)
    $('#runcs502x').click(function () {
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {

        // only inject into all frames for Canvas (which has iframes)
        var allFrames = /:\/\/canvas\.harvard\.edu|cm\.dce\.harvard\.edu\//.test(tabs[0].url);

            // inject extension's JavaScript
            chrome.tabs.executeScript(undefined, {allFrames: true, file: 'lib/jquery-1.11.1.min.js'}, function(results) {
                chrome.tabs.executeScript(undefined, {allFrames: true, file: 'lib/flowplayer.commercial-5.5.0/flowplayer.min.js'}, function(results) {
                    chrome.tabs.executeScript(undefined, {allFrames: false, file: 'js/script.js'}, function(results) {
                        chrome.tabs.executeScript(undefined, {allFrames: true, file: 'js/findurl.js'});
                    });
                });
            });
        });
    });
    // all credit for CS50 2x goes to its actual authors

    // listener for video time-grab (and pause!) function
    $('#gettime').click(function () {
        console.log('pause video good yo');
        chrome.tabs.executeScript(undefined, {allFrames: false, file: 'js/pausevideo.js'})
    });

    // listener for function to resume video playback
    $('#resume').click(function () {
        console.log('resume video good yo');
        chrome.tabs.executeScript(undefined, {allFrames: false, file: 'js/resumeplayback.js'})
    });

    // listener for options
    $('#option').click(function () {
        chrome.tabs.create({url: "options.html"});
    });
});