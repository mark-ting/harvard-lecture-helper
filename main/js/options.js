/*global $, jQuery, alert*/

var extID = chrome.runtime.id;

$(document).ready(function (e) {
    "use strict";

    $('#id').html('Chrome Extension ID: ' + extID);

    $('#clear-data').click(function (e) {
        clear_local(extID);
    });
})

// Saves options to chrome.storage
function clear_local(sessionKey) {
    if (confirm('Are you sure you want to delete ALL local data?')) {
        window.localStorage.clear(sessionKey);
        alert('All local session data has been cleared.');
    } else {
        alert('Local session data has not been altered.');
    }
}