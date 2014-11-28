/*global $, jQuery, alert*/

$.getScript("checkCS502x.js", function () {
    "use strict";
    alert("Script loaded and executed.");
});

$(document).ready(function () {
    "use strict";
    $('#summernote').summernote({
        height: 300,
        width: 500,
        minHeight: 200,
        maxHeight: 800,
        focus: true
    });
});