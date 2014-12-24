/*global $, jQuery, alert*/

var extID = chrome.runtime.id;

$(document).ready(function (e) {
    "use strict";

    // resize window and open Summernote canvas
    resizeWindow();
    load_local('#summernote', extID);
    open('#summernote');

    // hide unneeded UI elements
    $('#save-note').toggle();

    // listener for editing Summernote canvas
    $('#edit-note').click(function (e) {
        open('#summernote');
    });

    // listener for saving Summernote canvas
    $('#save-note').click(function (e) {
        close('#summernote');
    });

    $('#load-note').click(function (e) {
        file_import('#summernote');
    });

    // listener for downloading saved HTML canvas
    $('#download-note').click(function (e) {
        var fileName =  $('#note-title').val(); // You can use the .txt extension if you want

        if (fileName !== null) {
            file_export(fileName, '#summernote', 'text/plain');
        } else {
            alert('Please provide a title for your note!');
        }
    });
});

// toggles visibility of UI elements
function toggleOptionVisibility() {
    $("#edit-note").toggle();
    $("#save-note").toggle();
    $("#save-file").toggle();
    $("#load-file").toggle();
}

// create new instance of Summernote element within specified element
function open(element) {
    $(element).summernote({
        height: 480,
        width: 800,
        minHeight: 400,
        maxHeight: 640,
        focus: true,
        onkeyup: function (e) {
            save_local('#summernote', extID);
        },
        toolbar: [
            ['style', ['style']], // no style button
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['insert', ['picture', 'link']], // no insert buttons
            ['table', ['table']], // no table button
            ['help', ['help']] //no help button
        ]
    });
    load_local('#summernote', extID);
    toggleOptionVisibility();
}

// close opened instance Summernote element within specified element
function close(element) {
    save_local(element, extID);
    $(element).html = $(element).code();
    $(element).destroy();
    toggleOptionVisibility();
}

// download dynamic HTML element as .hlnote format
function file_export(fileName, elementID, mimeType) {
    var elHtml = $(elementID).html(),
        link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', fileName + '.hlnote');
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}

// saves innerHTML within specified element to localStorage using specified sessionKey
function save_local(element, sessionKey) {
    var content = $(element).code();
    localStorage[sessionKey] = content;
}

// loads innerHTML within specified element to localStorage using specified sessionKey
function load_local(element, sessionKey) {
    $.get('../new_user.html', function (content) {
        if (localStorage[sessionKey] != null) {
            content = localStorage[sessionKey];
        }
        $(element).code(content);
    }, 'text');
}

// loads user-provided file (text document) into specified element
function file_import(element) {
    var file = $('#select-file')[0].files[0];
    var reader = new FileReader();

    reader.onload = function () {
        var content = reader.result;
        var target = $(element);

        // load into local storage
        localStorage[extID] = content;

        // load into Summernote
        $(target).code(content);

        // load into element
        $(target).html(content);
    };

    if (file) {
        reader.readAsText(file);
    } else {
        alert('Please choose a file to upload!');
    }
}

function resizeWindow() {
    chrome.windows.getCurrent(function (window) {
        var windowSize = {
            width: 820,
            height: 670
        };
        chrome.windows.update(window.id, windowSize);
    });
}

/*global $, jQuery, alert*/

function array_subdivide(string, sessionKey) {
    var content = $(element).code();
    localStorage[sessionKey] = JSON.stringify(content);
    console.log("Subdividing array:");
    console.log(localStorage[sessionKey]);
}

function array_recombine(string) {
    var content = JSON.parse(localStorage[sessionKey]);
    console.log("Recombining array:");
    console.log(content);
}