function copy(str) {
    window.prompt("URL to resume playback. To copy: Ctrl-C/Cmd-C + Enter.", str);
}

// we're on youtube
if (document.URL.indexOf("youtube.com") > -1) {
    // get all video elements
    var videoElements = document.getElementsByTagName('video');
    try {
        // couldn't find video
        if (videoElements === null || videoElements.length === 0) {
            alert("Error: Could not locate video");
        } else {
            for (var i = 0; i < videoElements.length; i++) {
                // pause video
                videoElements[i].pause();
                // time of current video
                var time = Math.floor(Number(videoElements[i].currentTime));
                
                var index = document.URL.indexOf("&t=");
                // url to resume playing at current time
                var url = document.URL;
                if (index === -1)
                    var url = url + "&t=" + time;
                else {
                    var after_url = url.substring(index + 4);
                    var next_var = after_url.indexOf("&");
                    var url = url.substring(0, index + 3);
                    if (next_var === -1) {
                        url = url + time;
                    } else {
                        url = url + time + after_url.substring(next_var);
                    }
                }
                copy(url);
            }
        }
    } catch (err) {console.log("Error: " + err); }
} else {
    // Assume CS50 2x has already run, so the player is Flowplayer.
    // Then we can just get all video elements again
    var videoElements = document.getElementsByTagName('video');
    try {
        // couldn't find video, probably because there isn't one or the user forgot to press CS50 2X
        if (videoElements === null || videoElements.length === 0) {
            alert("Error: Could not locate video to get timestamp. Perhaps you forgot to run CS50 2X?");
        } else {
            var found = false;
            for (var i = 0; i < videoElements.length; i++) {
                // some webpages might have multiple videos, so only look at the actively playing one
                if (!videoElements[i].paused) {
                    found = true;
                    // pause video
                    videoElements[i].pause();
                    // time of current video
                    var time = Math.floor(Number(videoElements[i].currentTime));
                    var index1 = document.URL.indexOf("playbackTime=");
                    // url to resume playing at current time
                    var url = document.URL;
                    if (index1 === -1)
                        var url = url + "&playbackTime=" + time;
                    else {
                        var after_url = url.substring(index1 + 14);
                        var next_var = after_url.indexOf("&");
                        var url = url.substring(0, index1 + 13);
                        if (next_var === -1) {
                            url = url + time;
                        } else {
                            url = url + time + after_url.substring(next_var);
                        }
                    }
                    var index2 = url.indexOf("videoSource=");
                    if (index2 === -1)
                        var url = url + "&videoSource=" + videoElements[i].src;
                    else {
                        var after_url = url.substring(index2 + 13);
                        var next_var = after_url.indexOf("&");
                        var url = url.substring(0, index2 + 12);
                        if (next_var === -1) {
                            url = url + videoElements[i].src;
                        } else {
                            url = url + videoElements[i].src + after_url.substring(next_var);
                        }
                    }
                    copy(url);
                }
            }
            if (!found) {
                alert("All videos on this page are paused. Please play the one you wish to take the timestamp of.");
            }
        }
    } catch (err) {console.log("Error: " + err);}
}