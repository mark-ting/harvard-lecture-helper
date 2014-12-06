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

var objs = []; // we'll store the object references in this array

if (document.URL.indexOf("youtube.com") > -1) {
    //window.location = document.URL + "&enablejsapi=1";
    var videoElements = document.getElementsByTagName('video');
    /* var id = document.URL.substring(document.URL.indexOf("v=") + 2);
    id = id.substring(0, id.indexOf("&"));
    console.log(id);
    var player = document.getElementById(id); */
    try {
        if (videoElements === null || videoElements.length === 0) {
            alert("Error: Could not locate video");
        } else {
            for (var i = 0; i < videoElements.length; i++) {
                console.log(videoElements[i]);
                // pause video
                videoElements[i].pause();
                // time of current video
                var time = Math.floor(Number(videoElements[i].currentTime));
                var index = document.URL.indexOf("t=");
                // url to resume playing at current time
                if (index === -1)
                    var url = document.URL + "&t=" + time;
                else {
                    var url = document.URL.substring(0, index);
                    url = url + time + document.URL.substring(url.indexOf("&"));
                }
                console.log(url);
            }
        }
    } catch (err) {console.log("ERROR: " + err); }
} else {
    /* var embedded = document.getElementsByTagName('embed');
    if (embedded !== null) {
        try {
            for (var i = 0; i < embedded.length; i++) {
                alert("Testing something...");
                if (embedded[i].type === "application/x-shockwave-flash") {
                    alert("Testing something else...");
                    var src = embedded[i].getPlaylist()[0].file;
                    alert(src);
                    alert(embedded[i]);
                    embedded[i].remove();
                    document.write('<video class="video-stream html5-main-video" x-webkit-airplay="allow" src="' + src + '" style="width: 479px; height: 360px; left: 80.75px; top: 0px; transform: none;"></video>');
                }
            }
        } catch (err) {console.log("ERROR: " + err)}
    } */
    // Assume CS50 2x has already run, so the player is Flowplayer.
    //window.location = document.URL + "&enablejsapi=1";
    var videoElements = document.getElementsByTagName('video');
    /* var id = document.URL.substring(document.URL.indexOf("v=") + 2);
    id = id.substring(0, id.indexOf("&"));
    console.log(id);
    var player = document.getElementById(id); */
    try {
        if (videoElements === null || videoElements.length === 0) {
            alert("Error: Could not locate video to get timestamp. Perhaps you forgot to run CS50 2X?");
        } else {
            for (var i = 0; i < videoElements.length; i++) {
                if (!videoElements[i].paused) {
                    console.log(videoElements[i]);
                    // pause video
                    videoElements[i].pause();
                    // time of current video
                    var time = Math.floor(Number(videoElements[i].currentTime));
                    // url to resume playing at current time
                    var url = document.URL + "&playbackTime=" + time + "&videoSource=" + videoElements[i].src;
                    console.log(url);
                }
            }
        }
    } catch (err) {console.log("ERROR: " + err);}
}
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
    /*,                    function(results) {
             chrome.tabs.executeScript(undefined, {allFrames: true, file:'js/findurl.js'});
        } );
    });
});




    chrome.tabs.executeScript(undefined, {allFrames: true, file: 'js/jquery-1.11.1.min.js'}, function (results) {*/