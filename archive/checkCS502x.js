/*global $, jQuery, alert*/

$.ajax({
    url: 'chrome-extension://hgmddncbkbggaeofkbdcjbihmgogldjp/manifest.json',
    type: 'HEAD',
    error: function () {
        "use strict";
        alert("CS50 2x not installed!");
        //file not exists
    },
    success: function () {
        "use strict";
        alert("CS50 2x installed and ready to go!");
        //file exists
    }
});