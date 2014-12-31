// get source from jwplayer at icommons
if (window.location.hostname === 'icommons.harvard.edu') {

  // JW player
  if (typeof($('.jwvideo video').attr('src')) !== 'undefined') {
	
		// get source, either mp4 or mp3
		var source = $('.jwvideo video').attr('src');

		// send source to canvas
		parent.postMessage([source, document.url], 'https://canvas.harvard.edu');
  }
}

// get source from vimeo
else if (window.location.hostname === 'player.vimeo.com') {

	// get source mp4
	var source = document.body.innerHTML.match(/[\w:\/.]*.mp4\?[\w=_&]*/)[0];

	// send source to isites
	parent.postMessage([source, window.location.href], 'http://isites.harvard.edu');
}

// get source from live.cs50
else if (window.location.hostname === 'www.youtube.com') {

	var source = document.getElementsByClassName('video-stream')[0].src;
	if (source) {
		parent.postMessage([source, window.location.href], 'https://live.cs50.net');
	}
	else {
		// select the target node
		var target = document.querySelector('.video-stream');
		 
		// create an observer instance
		var observer = new MutationObserver(function(mutations) {
		    mutations.forEach(function(mutation) {
		        if (mutation.attributeName === 'src') {
		        	var source = document.getElementsByClassName('video-stream')[0].src;
					parent.postMessage([source, window.location.href], 'https://live.cs50.net');
		        }
		    });    
		});
		 
		// configuration of the observer:
		var config = { attributes: true, childList: true, characterData: true }
		 
		// pass in the target node, as well as the observer options
		observer.observe(target, config);
		 
		// pull out video with unique hash
		$('.ytp-large-play-button').click();
	}
}


