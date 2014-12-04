/*global $, jQuery, alert*/

$(document).ready(function () {
    "use strict";

    edit('#summernote');
    $("#save-note").toggle();

    // listener for editing Summernote canvas
    $('#edit-note').click(function () {
        edit('#summernote');
    });

    // listener for saving Summernote canvas
    $('#save-note').click(function () {
        save('#summernote');
    });

    // listener for downloading saved HTML canvas
    $('#download-note').click(function () {
        var fileName =  document.getElementById('note-title').value; // You can use the .txt extension if you want

        if (fileName !== null) {
            downloadInnerHTML(fileName, 'summernote', 'text/html');
        } else {
            alert('Please provide a title for your note!');
        }
    });
});


var key = "draft";
var editableContent = document.getElementById('summernote');
editableContent.innerHTML = localStorage[key] || '';

function downloadInnerHTML(fileName, elementID, mimeType) {
    var elHtml = document.getElementById(elementID).innerHTML,
        link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', fileName);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}

// creates Summernote element within specified DIV
function edit(div) {
    $(div).summernote({
        height: 600,
        width: 1024,
        minHeight: 400,
        maxHeight: 1280,
        focus: true
    });
    toggleOptionVisibility();
}

// saves Summernote element within specified DIV
function save(div) {
    var aHTML = $(div).code(); //save HTML If you need(aHTML: array).
    $(div).destroy();
    localStorage[key] = editableContent.innerHTML;
    toggleOptionVisibility();
}

// toggles button element visibility
function toggleOptionVisibility() {
    $("#edit-note").toggle();
    $("#save-note").toggle();
    $("#download-note").toggle();
    $("#note-title").toggle();
}