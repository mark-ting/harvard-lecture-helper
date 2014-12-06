// don't do this if we're on youtube, which handles its own time separately
if (document.URL.indexOf("youtube.com") === -1) {
    var time = document.URL.substring(document.URL.indexOf("playbackTime=") + 13);
    var nextVar = time.indexOf("&");
    if (nextVar !== -1)
        time = time.substring(0, nextVar);
    // videoSource needs to be last input in URL
    var src = document.URL.substring(document.URL.indexOf("videoSource=") + 12);
    
    var videoElements = document.getElementsByTagName('video');
    console.log(time);
    console.log(src);
    console.log(videoElements);
    /* var id = document.URL.substring(document.URL.indexOf("v=") + 2);
    id = id.substring(0, id.indexOf("&"));
    console.log(id);
    var player = document.getElementById(id); */
    try {
        if (videoElements === null || videoElements.length === 0) {
            alert("No videos are available for resuming on this page. Perhaps you forgot to run CS50 2X?");
        } else {
            for (var i = 0; i < videoElements.length; i++) {
                if (videoElements[i].src == src) {
                    console.log(videoElements[i]);
                    // play video
                    videoElements[i].play();
                    videoElements[i].currentTime = time;
                    console.log(time);
                }
            }
        }
    } catch (err) {console.log("ERROR: " + err);}
}