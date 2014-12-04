/*global $, jQuery, alert*/

$(document).ready(function () {
    "use strict";
    $('#summernote').summernote({
        height: 300,
        width: 500,
        minHeight: 200,
        maxHeight: 800,
        focus: true
    });

    $('#export').click(function () {
        downloadInnerHtml(fileName, 'summernote', 'text/html');
    });
    /*
    var button = Dropbox.createSaveButton(chrome.extension.getURL('notepad.html'), 'note.html');
    document.getElementById('save').appendChild(button);
    */
});

function downloadInnerHtml(filename, elId, mimeType) {
    var elHtml = document.getElementById(elId).innerHTML;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}

var fileName =  'export.html'; // You can use the .txt extension if you want