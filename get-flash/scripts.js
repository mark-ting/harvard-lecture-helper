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

if (document.URL.indexOf("youtube.com") > -1) {
    //window.location = document.URL + "&enablejsapi=1";
    var videoElements = document.getElementsByTagName('video');
    /* var id = document.URL.substring(document.URL.indexOf("v=") + 2);
    id = id.substring(0, id.indexOf("&"));
    console.log(id);
    var player = document.getElementById(id); */
    try {
        if (videoElements !== null) {
            for (var i = 0; i < videoElements.length; i++) {
                console.log(videoElements[i]);
                // pause video
                videoElements[i].pause();
                // time of current video
                var time = Math.floor(Number(videoElements[i].currentTime));
                // url to resume playing at current time
                var url = document.URL + "&t=" + time;
                console.log(url);
                videoElements[i].currentTime = time + 100;
            }
        }
    } catch (err) {console.log("ERROR: " + err);}
}
else { // Assume CS50 2x has already run, so the player is Flowplayer.
    //window.location = document.URL + "&enablejsapi=1";
    var videoElements = document.getElementsByTagName('video');
    /* var id = document.URL.substring(document.URL.indexOf("v=") + 2);
    id = id.substring(0, id.indexOf("&"));
    console.log(id);
    var player = document.getElementById(id); */
    try {
        if (videoElements !== null) {
            for (var i = 0; i < videoElements.length; i++) {
                console.log(videoElements[i]);
                // pause video
                videoElements[i].pause();
                // time of current video
                var time = Math.floor(Number(videoElements[i].currentTime));
                // url to resume playing at current time
                console.log(time);
                videoElements[i].currentTime = time + 100;
            }
        }
    } catch (err) {console.log("ERROR: " + err);}
    
    /* function walkTheObject(obj) {
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
            if (obj.type === "application/x-shockwave-flash") {
                console.log("Found flash file: " + obj);
                console.log("Id = " + obj.id);
                flash = obj;
            }
        } catch (err) {console.log("ERROR: " + err); }
    });
    console.log(flash);
    flash.remove();*/
}
    /*,                    function(results) {
             chrome.tabs.executeScript(undefined, {allFrames: true, file:'js/findurl.js'});
        } );
    });
});




    chrome.tabs.executeScript(undefined, {allFrames: true, file: 'js/jquery-1.11.1.min.js'}, function (results) {*/