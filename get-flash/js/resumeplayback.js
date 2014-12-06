// don't do this if we're on youtube, which handles its own time separately
if (document.URL.indexOf("youtube.com") === -1) {
    // get playback time
    var time = document.URL.substring(document.URL.indexOf("playbackTime=") + 13);
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
            for (var i = 0; i < videoElements.length; i++) {
                // make sure video is the right one, the one specified in src
                if (videoElements[i].src == src) {
                    // play video
                    videoElements[i].play();
                    // set video's time to time stored in URL
                    videoElements[i].currentTime = time;
                }
            }
        }
    } catch (err) {console.log("ERROR: " + err);}
}