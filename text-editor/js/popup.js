/*global $, jQuery, alert*/

$.getScript("checkCS502x.js", function () {
    "use strict";
    alert("Script loaded and executed.");
});

$(document).ready(function () {
    "use strict";

    //checkFileAPI();

    $('#loadedcontent').load("test.html");

    $('#summernote').summernote({
        height: 300,
        width: 500,
        minHeight: 200,
        maxHeight: 800,
        focus: true
    });

    var button = Dropbox.createSaveButton(chrome.extension.getURL('popup.html'), 'summernote.html');
    document.getElementById('container').appendChild(button);

    //document.getElementById('file').addEventListener('change', loadFile, false);

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

function loadFile(evt) {
    var f = evt.target.files[0];

    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            alert("Got the file.n"
                + "name: " + f.name + "n"
                + "type: " + f.type + "n"
                + "size: " + f.size + " bytesn"
                + "starts with: " + contents.substr(1, contents.indexOf("n")));
        };

        r.readAsText(f);
    } else {
        alert("Failed to load file");
    }
}