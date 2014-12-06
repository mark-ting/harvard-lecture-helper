// get playback time
var time = 0;
if (document.URL.indexOf("youtube.com") > -1)
    time = document.URL.substring(document.URL.indexOf("t=") + 2);
else
    time = document.URL.substring(document.URL.indexOf("playbackTime=") + 13);
var nextVar = time.indexOf("&");
if (nextVar !== -1)
    time = time.substring(0, nextVar);
// videoSource needs to be last input in URL
var src = document.URL.substring(document.URL.indexOf("videoSource=") + 12);
// get all videos on webpage
var videoElements = document.getElementsByTagName('video');
try {
    // no video found
    if (videoElements === null || videoElements.length === 0) {
        alert("No videos are available for resuming on this page. Perhaps you forgot to run CS50 2X?");
    } else {
        var found = false;
        for (var i = 0; i < videoElements.length; i++) {
            // make sure video is the right one, the one specified in src
            // there is no src for youtube, since each youtube page only has one video; this must be the correct video
            if (videoElements[i].src == src || (document.URL.indexOf("youtube.com") > -1)) {
                found = true;
                // play video
                videoElements[i].play();
                // set video's time to time stored in URL
                videoElements[i].currentTime = time;
            }
        }
        if (!found) {
            alert("Could not locate video.");
        }
    }
} catch (err) {console.log("ERROR: " + err);}