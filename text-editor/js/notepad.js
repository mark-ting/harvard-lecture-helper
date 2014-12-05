/*global $, jQuery, alert*/

$(document).ready(function () {
    "use strict";

    open('#summernote');
    $('#save-note').toggle();
    $('#load-file').toggle();
    //toggleOptionVisibility();

    // listener for editing Summernote canvas
    $('#edit-note').click(function () {
        open('#summernote');
    });

    // listener for saving Summernote canvas
    $('#save-note').click(function () {
        close('#summernote');
    });

    // listener for downloading saved HTML canvas
    $('#download-note').click(function () {
        var fileName =  document.getElementById('note-title').value; // You can use the .txt extension if you want

        if (fileName !== null) {
            file_export(fileName, 'summernote', 'text/plain');
        } else {
            alert('Please provide a title for your note!');
        }
    });

    $('#load-note').click(function () {
        file_import('#summernote');
    });

    $('#summernote').focusout(function () {
        localStorage[key] = editableContent.innerHTML;
    });
});


// create new instance of Summernote element within specified element
function open(element) {
    $(element).summernote({
        height: 600,
        width: 1024,
        minHeight: 400,
        maxHeight: 768,
        focus: true,
        onkeyup: function(e) {
            save_local('#summernote', 'notepad');
        },
    });

    load_local('#summernote', 'notepad');
    toggleOptionVisibility();
}

// close opened instance Summernote element within specified element
function close(element) {
    save_local(element, 'notepad');
    $(element).html = $(element).code();
    $(element).destroy();
    toggleOptionVisibility();
}

// saves innerHTML within specified element to localStorage using specified sessionKey
function save_local(element, sessionKey) {
    var content = $(element).code();
    localStorage[sessionKey] = content;
}

// loads innerHTML within specified element to localStorage using specified sessionKey
function load_local(element, sessionKey) {
    if (localStorage[sessionKey]) {
        var content = localStorage[sessionKey];
    } else {
        var content = $(element).load('new_user.html');
    }

    $(element).code(content);
}

// toggles visibility of UI elements
function toggleOptionVisibility() {
    $("#edit-note").toggle();
    $("#save-note").toggle();
    $("#save-file").toggle();
    $("#load-file").toggle();
}

// download dynamic HTML element
function file_export(fileName, elementID, mimeType) {
    var elHtml = document.getElementById(elementID).innerHTML,
        link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', fileName);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}

// loads user-provided file (text document) into specified element
function file_import(element) {
    var file = $('#select-file')[0].files[0];
    var reader = new FileReader();
    reader.onload = function () {
        var content = reader.result;
        var target = $(element);

        // load into Summernote
        $(target).code(content);

        // load into element
        $(target).html(content);
    }
    if (file) {
        reader.readAsText(file);
    } else {
        alert('Please choose a file to upload!');
    }
}
