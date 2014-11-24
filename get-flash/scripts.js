// From https://stackoverflow.com/questions/8409577/get-all-the-objects-dom-or-otherwise-using-javascript

// console.log("Entering scripts.js");
/*var objs = []; // we'll store the object references in this array

function walkTheObject(obj) {
    var keys = Object.keys(obj); // get all own property names of the object

    keys.forEach(function (key) {
        var value = obj[key]; // get property value

        // if the property value is an object...
        if (value && typeof value === 'object') {

            // if we don't have this reference...
            if (objs.indexOf(value) < 0) {
                objs.push(value); // store the reference
                console.log("Type of object: " + typeof value);
                walkTheObject(value); // traverse all its own properties
            }

        }
    });
}

walkTheObject(this); // start with the global object
*/

// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
//console.log('Printing elements of ' + tab.url);
    // document.body.style.backgroundColor="red"
    // No tabs or host permissions needed!
        // From https://stackoverflow.com/questions/8409577/get-all-the-objects-dom-or-otherwise-using-javascript

console.log("Entering scripts.js");
var objs = []; // we'll store the object references in this array

function walkTheObject(obj) {
    try {
        //console.log("Recursing...");
        var keys = Object.keys(obj); // get all own property names of the object

        keys.forEach(function (key) {
            var value = obj[key]; // get property value

            // if the property value is an object...
            if (value && typeof value === 'object') {

                // if we don't have this reference...
                if (objs.indexOf(value) < 0) {
                    objs.push(value); // store the reference

                    walkTheObject(value); // traverse all its own properties
                }

            }
        });
    } catch (err) {console.log("ERROR: " + err); }
}

walkTheObject(document); // start with the global object

console.log("Trying to find flash files...");

var flash = null;
objs.forEach(function (obj) {
    try {
        var type = obj.type;
        if (type === "application/x-shockwave-flash") {
            console.log("Found flash file: " + obj);
            console.log("Id = " + obj.id);
            flash = obj;
        }
    } catch (err) {console.log("ERROR: " + err); }
});

    
    /*,                    function(results) {
             chrome.tabs.executeScript(undefined, {allFrames: true, file:'js/findurl.js'});
        } );
    });
});




    chrome.tabs.executeScript(undefined, {allFrames: true, file: 'js/jquery-1.11.1.min.js'}, function (results) {*/