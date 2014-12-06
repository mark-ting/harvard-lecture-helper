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

function save_options() {
    var color = document.getElementById('color').value;
    var likesColor = document.getElementById('like').checked;
    chrome.storage.sync.set({
        favoriteColor: color,
        likesColor: likesColor
    }, function() {

        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
// Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        favoriteColor: 'red',
        likesColor: true
    }, function(items) {
        document.getElementById('color').value = items.favoriteColor;
        document.getElementById('like').checked = items.likesColor;
    });
}