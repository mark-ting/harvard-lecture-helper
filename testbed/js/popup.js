/*global $, jQuery, alert*/

$(document).ready(function () {
    "use strict";

    $('#main-menu').on('click', 'button, input', function (e) {
        e.preventDefault();
        var target = e.target;

        switch (target.id) {
        case 'notepad':
            chrome.windows.create({url: "notepad.html",
                                   type: "popup"});
            break;
        case 'run-cs50-2x':
            chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
                // only inject into all frames for Canvas (which has iframes)
                var allFrames = /:\/\/canvas\.harvard\.edu|cm\.dce\.harvard\.edu\//.test(tabs[0].url);

                // inject extension's JavaScript
                chrome.tabs.executeScript(undefined, {allFrames: true, file: 'lib/jquery-1.11.1.min.js'}, function (results) {
                    chrome.tabs.executeScript(undefined, {allFrames: true, file: 'lib/flowplayer_free-5.5.2/flowplayer.min.js'}, function (results) {
                        chrome.tabs.executeScript(undefined, {allFrames: false, file: 'js/script.js'}, function (results) {
                            chrome.tabs.executeScript(undefined, {allFrames: true, file: 'js/findurl.js'});
                        });
                    });
                }); // all credit for CS50 2x goes to its authors
            });
            break;
        case 'get-time':
            chrome.tabs.executeScript(undefined, {allFrames: false, file: 'js/pausevideo.js'});
            break;
        case 'resume':
            chrome.tabs.executeScript(undefined, {allFrames: false, file: 'js/resumeplayback.js'});
            break;
        case 'options':
            chrome.tabs.create({url: "options.html"});
            break;
        case 'help':
            chrome.tabs.create({url: "help.html"});
            break;
        default:
        }
    });
});