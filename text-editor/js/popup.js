/*global $, jQuery, alert*/

$(document).ready(function () {
    "use strict";

    $('#notepad').click(function () {
        chrome.tabs.create({url: "notepad.html"});
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