var embedded = document.getElementsByTagName('embed');
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
    }