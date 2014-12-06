/*global $, jQuery, alert*/

$(document).ready(function () {
    "use strict";

    $('#notepad').click(function () {
         chrome.windows.create({url: "notepad.html"});
    });

    $('#runcs502x').click(function () {
        //chrome.tabs.create({url: "notepad.html"});
        console.log('FUTURE: runs CS50 2x');
    });

    $('#gettime').click(function () {
        //chrome.tabs.create({url: "notepad.html"});
        console.log('FUTURE: gets video time');
    });

    $('#option').click(function () {
        chrome.tabs.create({url: "options.html"});
    });
});

// Check for the various File API support.
function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        return;
    } else {
        alert('File APIs unavailable.');
        return;
    }
}