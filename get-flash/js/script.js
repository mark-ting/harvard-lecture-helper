/**
 * This is CS50 2x.
 *
 * Dan Bradley
 * Cheng Gong
 * David J. Malan
 */

// values for playbackRate
var SPEEDS = [.75, 1, 1.5, 2, 3];

// injects function into page's head and executes it, sans jQuery
var inject = function(f) {
  var script = document.createElement('script');
  script.textContent = '(' + f + ').apply(undefined, ' + JSON.stringify(Array.prototype.slice.call(arguments, 1)) + ');';
  document.head.appendChild(script);
  script.parentNode.removeChild(script);
};  

// configuration
var config;

// previous video time
var time = 0;

// number of messages
var messages = 0;

/** 
 * Filtering function
 */
function filterin (x, y) {
  return x == y;
}

/** 
 * Filtering function
 */
function filterout (x, y) {
  return x != y;
}

// currently playing player
var current = {};

// adding a pause field so it isn't undefined
current.pause = function () {};

/** 
 * Tells user how to access cm.dce videos
 */
function installcmdce () {
  if (((matches = window.location.href.match(/(http:\/\/cm.dce.harvard.edu\/.*?\/)screen_/)) !== null) ||
     ((matches = window.location.href.match(/(http:\/\/cm.dce.harvard.edu\/.*?\/)index_/)) !== null)) {

    // check for part 1
    $.get(matches[1] + 'mobile_Mp4TalkingHeadSlideVideo-1.shtml', function(data, textStatus, jqXHR) {

      // check for URL of mobile-friendly (and 2x-friendly) video
      var source = $(data).find('video source').attr('src');

      // explain how to open in VLC
      if (typeof(source) !== 'undefined') {
        $('html').html(
          '<head><title>This is CS50 2x.</title></head>' +
          '<body style="font-family: sans-serif;">' +
          '<h1>This is CS50 2x.</h1>' +
          '<p>DCE\'s videos can\'t be sped up within a browser, but here\'s a workaround!</p>' +
          '<ul>' +
          '<li>Download and install VLC at <a href="http://www.videolan.org/vlc/" target="_blank">http://www.videolan.org/vlc/</a>.</li>' +
          '<li>Launch VLC.</li>' +
          '<li>Select <b>File &gt; Open Network...</b>.</li>' +
          '<li>Copy/paste this URL for part 1:<br/><textarea onclick="this.focus(); this.select();" readyonly rows="3" style="max-width: 441px; width: 100%;">' + source + '</textarea></li>' +
          '<li>Copy/paste this URL for part 2, if any:<br/><textarea onclick="this.focus(); this.select();" readyonly rows="3" style="max-width: 441px; width: 100%;">' + source.replace('-1-', '-2-') + '</textarea></li>' +
          '<li>' +
          'To slow down or speed up in VLC' +
          '<ul>' +
          '<li>on a Mac, use &#8984;&#8211; and &#8984;+.</li>' +
          '<li>on a PC, use [ and ].</li>' +
          '</ul>' +
          '</ul>' +
          '</body>'
        );
      }
      else {
        apologize();
      }
    });
  }

  // TODO new DCE player
  else if ((matches = window.location.href.match(/(http:\/\/matterhorn.dce.harvard.edu\/.*?\/)/)) !== null) {
    apologize();
  }
  else {
    apologize();
  }
}

/** 
 * Installs flowplayer on iSites
 */
function installisites () {
  // video's parameter
  var parameter = {};
  parameter.number = '';

  // M4V
  if ((matches = $('div.fileRefJson').text().match(/(http:\/\/media.fas.harvard.edu\/[^"]*?\.m4v)/)) !== null) {
    parameter.source = matches[0];
    parameter.audio = false;
  }

  // MP4
  else if ((matches = $('div.fileRefJson + div').text().match(/(http:\/\/media-ht.isites.harvard.edu\/[^"]*?\.mp4\?[^"]*?)"/)) !== null) {
    parameter.source = matches[0];
    parameter.audio = false;

  }

  // MP3
  else if ((matches = $('div.fileRefJson').text().match(/(http:\/\/media.fas.harvard.edu\/[^"]*?\.mp3)/)) !== null) {
    parameter.source = matches[0];
    parameter.audio = true;
  }

  // additional configuration
  if (typeof(parameter.source) !== 'undefined') {
    parameter.title = $('.video-title').text();

    // get isites-stored data
    var testTime = window.document.getElementsByClassName("resume-sec")[0];
    if (testTime) {
      var iSitesTime = testTime.innerHTML;
      var iSitesDate = Date.parse(window.document.getElementsByClassName("resume-date")[0].innerHTML);
    }
    
    // get locally stored data 
    var hist = JSON.parse(localStorage.getItem(parameter.source));
    if (hist & testTime) {
      if (iSitesDate > hist.date) {
        parameter.time = iSitesTime;
      }
      else {
        parameter.time = hist.time;
      }
    }
    else if (hist) {
      parameter.time = hist.time;
    }
    else if (testTime) {
      parameter.time = iSitesTime;
    }
    // prepare new container
    var container = $('<div/>');

    // maximize player's width
    container.css('margin', '10px 0 0 0');
    container.css('padding', '0');
    container.css('width', '100%');

    // replace old container with new
    $('#video-info-container').replaceWith(container);

    parameter.playing = true;

    // install player
    install(container, parameter);
  }

  else if ((matches = $('div.fileRefJson').text().match(/(http:\/\/www.law.harvard.edu\/media\/[^"]*?\.mov)/)) !== null) {
    source = 'rtsp://media1.law.harvard.edu/Media/policy_a/' + matches[1].match(/\d\d\d\d\/\d\d\/\d\d_\w*.mov/)[0];
    // explain how to open in VLC
    if (typeof(source) !== 'undefined') {
      $('#video-info-container').html(
        '<h1>This is CS50 2x.</h1>' +
        '<p>HLS\'s videos can\'t be sped up within a browser, but here\'s a workaround!</p>' +
        '<ul>' +
        '<li>Download and install VLC at <a href="http://www.videolan.org/vlc/" target="_blank">http://www.videolan.org/vlc/</a>.</li>' +
        '<li>Launch VLC.</li>' +
        '<li>Select <b>File &gt; Open Network...</b>.</li>' +
        '<li>Copy/paste this URL for part 1:<br/><textarea onclick="this.focus(); this.select();" readyonly rows="3" style="max-width: 441px; width: 100%;">' + source + '</textarea></li>' +
        '<li>' +
        'To slow down or speed up in VLC' +
        '<ul>' +
        '<li>on a Mac, use &#8984;&#8211; and &#8984;+.</li>' +
        '<li>on a PC, use [ and ].</li>' +
        '</ul>' +
        '</ul>'
      );
    } 
    else {
      apologize();
    }
  }
  // if embedded flash youtube video
  else if ((matches = $('.fileRefJson').text().match(/(http:\/\/www.youtube.com\/watch\?v=)[\w]*/)) !== null) {
    alert("This youtube video is 2x-able if you click on the youtube link or go to " + matches[0]);
  }
  // might be vimeo in iframes
  else if ($('iframe')[0]) {
    
    var containers = $('iframe');

    // loop through all known videos
    for (var i = 0; i < containers.length; i++) {
  
      // listen for a url and install it at container
      addEventListener('message', installfromiframe(containers[i], containers[i].src, i), false);
    }
  }
  else {
    apologize();
  }
}

/** 
 * Installs flowplayer on icommons sites
 */
function installicommons () {

  // video parameters
  var parameter = {};
  parameter.playing = true;
  parameter.number = '';

  // MP4
  if (typeof($('.jwvideo video').attr('src')) !== 'undefined') {

    // prepare new container
    var container = $('<div/>');

    // get source
    parameter.source = $('.jwvideo video').attr('src');

    // stop video (else media.fas.harvard.edu hangs)
    inject(function() {
      jwplayer().stop();
    });

    var hist = JSON.parse(localStorage.getItem(parameter.source));
    if (hist) {
      parameter.time = hist.time;
    }

    // if file is mp3, set the audio flag
    if (parameter.source.match(/.mp3$/)) {
      parameter.audio = true;
    }

    // we assume this is the only video playing
    parameter.playing = true;

    // replace old container with new
    $('.jwplayer').replaceWith(container);

    // install player
    install(container, parameter);
  }

  // unsupported
  else {
    apologize();
  }
}

/** 
 * Installs flowplayer on canvas.harvard.edu pages.
 * Iframes exist for lecture videos (1 per page). Otherwise, there are 
 *  possibly multiple videos
 */
function installcanvas () {

  // if there's an iframe
  var iframe = document.getElementById('tool_content');
  if (iframe) {
  		addEventListener("message", installfromiframe('#content', 'about:blank', ''), false);
  } 
  
  // multiple videos as per
  // https://canvas.harvard.edu/courses/340/wiki/supplemental-materials-for-lab-1-reporter-gene-analysis-using-transgenic-animals?module_item_id=630  
  else {

    // video locations that may need a click to access 
    var containers = [].slice.call(document.getElementsByClassName('instructure_file_link_holder'));
    containers = containers.concat([].slice.call(document.getElementsByClassName('instructure_inline_media_comment')));
    // known video locations
    var matches = document.body.innerHTML.match(/me_flash_\d_container/g);

    // if any known videos exist, launch those
    if (matches) {

      // loop through all known videos
      for (var i = 0; i < matches.length; i++) {

        // pull out the video number
        matches[i] = matches[i].replace(/\D/g, "");

        // parameters for the videoplayer
        var parameter = {};

        // only supporting mp4 at the moment
        parameter.audio = false;

        // set number for video classes 
        parameter.number = matches[i];

        // get source for available video
        parameter.source = document.getElementById('mep_' + matches[i]).childNodes[0].childNodes[0].childNodes[1].src + '?1';
        if (parameter.source) {

          // get locally stored data 
          var hist = JSON.parse(localStorage.getItem(parameter.source));
          if (hist) {
            parameter.time = hist.time;
          }

          // prepare new container
          var container = $('<div/>');

          // maximize player's width
          container.css('margin', '10px 0 0 0');
          container.css('padding', '0');
          container.css('width', '100%');
          parameter.playing = false;

          // find if the video is playing
          if ($('#mep_' + matches[i]).find('.mejs-pause')[0]){
            parameter.playing = true;
          }

          // replace old container with new
          $('#mep_' + matches[i]).replaceWith(container);

          // install player
          install(container, parameter);
        }
      }
    }

    // click on all possible video containers, watch if things change
    if (containers.length != 0) {

      // watch for changes for each container
      for(var i = 0; i < containers.length; i++) {

        // use mutation observer as per 
        // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {

            // see if changes are to the child of the container
            if (mutation.type === 'childList') {

              // look through each child
              Array.prototype.forEach.call(mutation.target.children, function (child) {

                // match (only once per video) -- same code as if (matches) branch
                matches = document.body.innerHTML.match(/me_flash_\d_container/g);
                if (matches) {
                  for (var i = 0; i < matches.length; i++) {
                    matches[i] = matches[i].replace(/\D/g, '');

                    // parameters for the videoplayer
                    var parameter = {};
                    parameter.audio = false;

                    // set number for video classes 
                    parameter.number = matches[i];

                    // get source for available video
                    parameter.source = document.getElementById('mep_' + matches[i]).childNodes[0].childNodes[0].childNodes[1].src + '?1';
                    if (parameter.source) {

                      // get locally stored data for time
                      var hist = JSON.parse(localStorage.getItem(parameter.source));
                      if (hist) {
                        parameter.time = hist.time;
                      }

                      // prepare new container
                      var container = $('<div/>');

                      // maximize player's width
                      container.css('margin', '10px 0 0 0');
                      container.css('padding', '0');
                      container.css('width', '100%');

                      // replace old container with new
                      $('#mep_' + matches[i]).replaceWith(container);

                      parameter.playing = false;

                      // install player
                      install(container, parameter);
                    }
                  }
                }
              });
            }
          });
        });

        // actually start observing
        observer.observe(containers[i], {
          childList: true,
          characterData: true,
          subtree: true
        });
      }

      // simulate click, waits for link to appear
      $('.media_comment_thumbnail').click();    
    } 

    // no possible video containers, apologize
    else {
      apologize();
    }
  }
}

/**
 *  Installs Flowplayer on live.cs50.net
 */
function installlive () {

  // get which possible iframe
  var iframe_src = document.getElementsByTagName('iframe')[0].src;
  // if livestream use data hidden in page
  if (iframe_src.match(/new.livestream.com/)) {
    // parameters for the videoplayer
    var parameter = {};
    parameter.audio = false;

    // set number for video classes 
    parameter.number = '';

    // get source for available video
    parameter.source = document.getElementById('vid_source').innerHTML.replace(/&amp;/g, '&');
    if (parameter.source) {

      // get locally stored data for time
      var hist = JSON.parse(localStorage.getItem(parameter.source));
      if (hist) {
        parameter.time = hist.time;
      }

      // prepare new container
      var container = $('<div/>');

      // maximize player's width
      container.css('padding', '0');
      container.css('width', '100%');

      // replace old container with new
      $('body').replaceWith(container);

      parameter.playing = true;

      // install player
      install(container, parameter);
    }
    
  }
  // if youtube use embedded data
  else if (iframe_src.match(/youtube.com/)[0]) {
    addEventListener('message', installfromiframe('body', 'about:blank', ''), false);
  }
}

/**
 * Installs Flowplayer on YouTube
 * Adapted from https://github.com/chrisrobins/YouTubeHTML5/blob/master/YouTubeHTML5.js
 */
function installyoutube() {

  /**
   *  Parses a StreamMap, pulls out the right url, takes 720p MP4 first, then 360p otherwise,
   *    then installs the player
   *  (@param) (string) streamMapHTML The StreamMap to be parsed
   */
  function parseStreamMap(streamMapHTML) {
    var streamMap = {};
    streamMapHTML.split(",").forEach(function (stream) {

      // gets url, tags, and signature
      try {
          var str = decodeURIComponent(stream);
          var tag = str.match(/itag=(\d{0,3})/)[1];
          var url = str.match(/url=(.*?)(\\u0026|$)/)[1].replace(/^https?:\/\//, '//');
          var sig = str.match(/[sig|s]=([A-Z0-9]*\.[A-Z0-9]*(?:\.[A-Z0-9]*)?)/);
          if (sig) {
              return;
          }
      } 
      catch (e) {
          return;
      }

      // finds 720 MP4 first if possible
      if (tag === '22') {
        var lab = 'MP4 720p';
      }

      // finds 360 MP4 if 720 didn't exist
      else if (tag === '18' && (!streamMap.itag || streamMap.itag !== '22')) {
        var lab = 'MP4 360p';
      }
      else {
        return;
      }
      streamMap = {
          'label': lab,
          'itag': tag,
          'url': decodeURIComponent(url)
      };
    });
    if (Object.keys(streamMap).length === 0) {
        return;
    }
    else {
      // prepare parameter object
      var parameter = {};
      parameter.number = '';

      parameter.source = streamMap.url;

      // this doesn't actually work... urls change enough that the source is useless
      // may be fixed later
      var hist = JSON.parse(localStorage.getItem(parameter.source));
      if (hist) {
        parameter.time = hist.time;
      }

      // if file is mp3, set the audio flag
      if (parameter.source.match(/.mp3$/)) {
        parameter.audio = true;
      }

      // we assume this is the only video playing
      parameter.playing = true;

      // youtube UI fixes
      $('#watch7-sidebar').css('display', 'none');
      $('#watch7-content').css('width', '100%');

      // prepare new container
      var container = $('<div/>');
      $('#player-api').replaceWith(container);

      // install player
      install(container, parameter);
    }
  }

  // pulls the nonfeathered streamMap out
  var smap = document.body.innerHTML.match(/"url_encoded_fmt_stream_map":\s"([^"]+)"/);
  $.ajax({
    url: location.href + "&nofeather=True",
    method: 'GET',
    success: function (data) {
      if (data) {
        var xmap = data.match(/"url_encoded_fmt_stream_map":\s"([^"]+)"/);
        if (xmap && xmap[1]) {
          parseStreamMap(xmap[1]);
        }
      }
    }
  });
}

/** 
 * Apologizes to user
 */
function apologize () {
  alert('Sorry! There doesn\'t seem to be a 2x-able video on this page. Email this page\'s URL to bugs@cs50.harvard.edu if you think there actually is!');
}

/** 
 * Installs player
 * @params {element} container Location the player will be installed
 * @params {object} params Object with various fields:
 *     time: when to start the video
 *     source: the video source
 *     number: string number of the video on the page or ""
 *     audio(optional): if the file is an audio file
 *     playing(optional): if the video is currently playing on install (matters for multiple videos)
 */
function install (container, params) {

  // inject Flowplayer's CSS only once, and mixpanels js only once
  if (document.getElementsByClassName('flowplayer').length < 1) {

    // inject Mixpanel's JavaScript, avoiding
    // "Mixpanel error: 'mixpanel' object not initialized"
    inject(function() {
      (function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===e.location.protocol?"https:":"http:")+'//cdn.mxpnl.com/libs/mixpanel-2.2.min.js';f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!== typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.track_charge people.clear_charges people.delete_user".split(" ");for(g=0;g<i.length;g++)f(c,i[g]); b._i.push([a,e,d])};b.__SV=1.2}})(document,window.mixpanel||[]); mixpanel.init("748a06cb9cd11be16cf9a11b3008e378", {debug: false});
    });

    $('head').append('<link href="' + chrome.extension.getURL('lib/flowplayer.commercial-5.5.0/skin/minimalist.css') + '" rel="stylesheet" />');
    $('head').append('<link href="' + chrome.extension.getURL('lib/font-awesome-4.0.3/css/font-awesome.min.css') + '" rel="stylesheet" />');
    $('head').append('<link href="' + chrome.extension.getURL('css/style.css') + '" rel="stylesheet" />');
  }

  // add play button
  container.addClass('play-button');
  container.attr('id', 'vid' + params.number);

  // if audio only, make video player into black box
  if (params.audio) {
    container.css('height', '200px'); 
    container.css('background', 'black');
  }

  // inject new player
  container.flowplayer({
    adaptiveRatio: true,
    analytics: 'UA-8162502-44',
    embed: false,
    fullscreen: false,
    key: '$330596610937457, $341934711312568, $205280267914896', 
    keyboard: false,
    logo: chrome.extension.getURL('img/logo.png'),
    playlist: [[{mp4: params.source}]],
    speeds: SPEEDS,
  });

  var api = flowplayer(container);

  if (params.playing) {
    current = api;
  }

  // inject (speed) buttons
  container.append('<div class="buttons" id="buttons' + params.number + '"/>');
  for (var i = 0, n = SPEEDS.length; i < n; i++) {

    // trim leading 0s as needed
    if (SPEEDS[i] < 1.0) {
       container.find('.buttons').append('<span>' + SPEEDS[i].toString().replace(/^0/,'') + 'x' + '</span>');
    }
    else {
       container.find('.buttons').append('<span>' + SPEEDS[i].toString() + 'x' + '</span>');
    }
  }
  var buttons = $('#buttons' + params.number + ' span');

  // inject 3x (i.e., custom-speed) button
  if (window.location.hostname === 'canvas.harvard.edu') {
    buttons.last().css('position', 'relative');
    buttons.last().css('top', '4px');
    buttons.last().html('<select class="customizer" style="width: 30px; margin-top: -8px"/>');
  }
  else {
    buttons.last().html('<select class="customizer" style="width: 30px; margin-top: 0px"/>');
  }

  buttons.find('.customizer').append('<option select value="3">3x &#9662;</option>');
  for (var i = 29; i >= 21; i--) { // avoid floating-point imprecision
    var value = (i / 10).toFixed(1).toString().replace(/\.0$/, '');
    container.find('.buttons select').append('<option value="' + 
        value + '">' + value + 'x' + '</option>');
  }

  // listen for changes and focus
  container.find('.customizer').bind('change focus', function(eventObject) {

    // update custom speed
    api.conf.speeds[api.conf.speeds.length - 1] = parseFloat($(this).val());

    // update actual speed
    api.speed($(this).val());
  });

  // blur customizer so that - and + still work
  container.find('.customizer').bind('change mouseout', function(eventObject) {
    $(this).blur();
  });

  // marks current speed's button as active
  var mark = function(rate) {
    buttons.removeClass('active');
    for (var i = 0; i < api.conf.speeds.length; i++) {
      if (api.conf.speeds[i] === rate) {
        buttons.eq(i).addClass('active');
        break;
      }
    }
  };

  // tracks an event with Mixpanel
  var track = function(e, o) {

    // ensure Object
    if (typeof(o) === 'undefined') {
      o = {};
    }

    // register super properties (sans mixpanel.register, so as to check api.ready)
    if (api.ready) {
      o.currentPos = api.video.time;
      o.currentSpeed = api.currentSpeed;
      o.duration = api.video.duration;
      o.height = api.video.height;
      o.title = params.title;
      o.width = api.video.width;
    }
    o.location = window.location.href;
    o.source = params.source;
    o.version = chrome.runtime.getManifest().version;

    // inject mixpanel.track
    inject(function(e, o) { mixpanel.track(e, o); }, e, o);
  };

  // wait for video to be ready
  api.bind('ready', function(e, api) {
    track('ready');

    // fast forward to last location
    if(params.time != undefined){
      api.seek(params.time);
    }

    // if it should be playing, play
    if (current === api) {

      // play video
      api.resume();
    }

    // hides ugly download link
    container.find('.ui-icon-extlink').css("display", "none");

    // adding ids to find time on unload
    container.find('.fp-elapsed').attr('id', 'fp-elapsed' + params.number);
    container.find('.fp-remaining').attr('id', 'fp-remaining' + params.number);

    // added unload function to store locally the recent time played 
    window.addEventListener('beforeunload', makeunloader(params.number));

    // change to 2x if valid speed
    if (SPEEDS.indexOf(2) !== -1) {
      api.speed(2); // will induce its own call to mark
    }
    else {
      mark(api.currentSpeed);
    }
  });

  // listen for changes to speed
  api.bind('speed', function(e, api, rate) {
    track('speed', {rate: rate});
    mark(rate);
  });

  // only enable viewport fullscreening on video files
  if (!params.audio) {

    // makes the fullscreen button
    container.find('.fp-waiting').after('<a class="fp-fullscreen" id="fp-fullscreen' + params.number + '"></a>');

    // adds click for fullscreen functionality
    container.find('.fp-fullscreen').click(function(eventObject) {
      if (document.getElementById("header") && container.hasClass('is-fullscreen')) {

        // shows canvas's banner when not fullscreen
        document.getElementById("header").style.display = "block";
      }
      else if (document.getElementById("header")) {

        // hides canvas's banner when fullscreen
        document.getElementById("header").style.display = "none";
      }
      
      if ($("#masthead-positioner") && container.hasClass('is-fullscreen')) {
        console.log('here');
        $("#masthead-positioner").css('z-index', 1999999999);
      }
      else if ($("#masthead-positioner")) {
        console.log('here');
        $("#masthead-positioner").css('z-index', 0);
      }
      

      // sends the click to only the player that was clicked
      track('click', {target: '#fp-fullscreen' + params.number});

      // sets the fullscreen video to the current video
      if (current != api) {
        current.pause();
        current = api;
      }

      // makes it fullscreen if not or vice versa
      container.toggleClass('is-fullscreen');
    });
  }

  // listen for clicks on (speed) buttons
  buttons.click(function(eventObject) {
    if (!$(this).hasClass('active')) {
      track('click', {rate: api.conf.speeds[buttons.index(this)], target: '#buttons' + params.number});
      api.speed(api.conf.speeds[buttons.index(this)]);
      api.resume(0);
    }
  });

  // link logo to Chrome Web Store
  container.find('.fp-logo').attr('href', 'https://chrome.google.com/webstore/detail/cs50-2x/hgmddncbkbggaeofkbdcjbihmgogldjp').attr('target', '_blank');
  container.find('.fp-logo').attr('id', 'fp-logo' + params.number);

  /*
  var elms = container.find('a');
  
  for (var i = 0; i < elms.length; i++) { 
    if (elms[i].href === 'http://flowplayer.org/') {
      if (elms[i].text === '') {
        $(elms[i]).attr('href', 'https://chrome.google.com/webstore/detail/cs50-2x/hgmddncbkbggaeofkbdcjbihmgogldjp').attr('target', '_blank');
        $(elms[i]).attr('id', 'fp-logo' + params.number);
        $(elms[i]).addClass('fp-logo');
        var logo = chrome.extension.getURL('img/logo.png');
        elms[i].style.backgroundImage = 'url(' + logo + ') !important';
      }
    }
  }*/

  // listen for clicks on logo
  container.find('.fp-logo').click(function(eventObject) {
    track('click', {
        href: 'https://chrome.google.com/webstore/detail/cs50-2x/hgmddncbkbggaeofkbdcjbihmgogldjp', 
        target: '#fp-logo' + params.number
    });
  });

  // inject (8-second) back-button
  container.find('.fp-play').before('<a class="back-button" id="back-button' + params.number + '"><i class="fa fa-step-backward"></i></a>');

  // listen for clicks on back-button
  container.find('.back-button').click(function(eventObject) {
    track('click', {target: '#back-button' + params.number});
    if (api.ready === true) {
       api.seek(Math.max(0, api.video.time - 8));
    }
  });

  // listen for clicks on play/pause
  container.find('.fp-play').attr('id', 'fp-play' + params.number);
  container.find('.fp-play').click(function(eventObject) {
    if (container.hasClass('is-paused')) {
      current.pause();
      current = api;
      current.resume();
      track('click', {target: '.is-paused #fp-play' + params.number});
    }
    else {
      current.pause();
      current = api;
      track('click', {target: '#fp-play' + params.number});
    }
  });

  // inject (30-second) forward-button
  container.find('.fp-play').after(
      '<a class="forward-button" id="forward-button' + params.number + '"><i class="fa fa-step-forward"></i></a>'
  );

  // listen for clicks on forward-button
  container.find('.forward-button').click(function(eventObject) {
    track('click', {target: '#forward-button'+ params.number});
    if (api.ready === true) {
      if (api.video.time < api.video.duration - 30) {
        api.seek(Math.min(api.video.duration - 30, api.video.time + 30));
      }
    }
  });

  // listen for seeks (however induced)
  api.bind('beforeseek', function(e, api, position) {
    track('beforeseek', {position: position});
  });

  // listen for changes to volume
  api.bind('volume', function(e, api, level) {
    track('volume', {level: level});
  });

  // inject download button
  container.find('.fp-controls').append(
      '<a class="download-button" id="download-button' + params.number +'" download href="' + params.source + '"><i class="fa fa-download"></i></a>'
  );
  container.find('.download-button').click(function(eventObject) {
    track('click', {target: '#download-button'});
  });

  // listen for keyboard shortcuts (without requiring that video be in focus)
  // http://jsfiddle.net/vWx8V/
  $(document).bind('keydown', function(eventObject) {

    // if API is ready and cursor isn't in a text field - affects only the most recent video
    if (api.ready && !$(document.activeElement).is(':input') && current == api) {

      // Esc
      if (eventObject.keyCode === 27) {
        if (document.getElementById('header')) {
          document.getElementById('header').style.display = 'block';
        }
        track('keydown', {keyCode: eventObject.keyCode});
        container.removeClass('is-fullscreen').removeClass('is-help');
      }

      // space bar
      else if (eventObject.keyCode === 32) {
        track('keydown', {keyCode: eventObject.keyCode});
        api.toggle();
        eventObject.preventDefault();
      }

      // left arrow
      else if (eventObject.keyCode === 37) {
        track('keydown', {keyCode: eventObject.keyCode});
        api.seek(Math.max(0, api.video.time - 8));
        eventObject.preventDefault();
      }

      // right arrow
      else if (eventObject.keyCode === 39) {
        track('keydown', {keyCode: eventObject.keyCode});
        if (api.video.time < api.video.duration - 30) {
          api.seek(Math.min(api.video.duration - 30, api.video.time + 30));
        }
        eventObject.preventDefault();
      }

      // plus
      else if (eventObject.keyCode === 187) {
        track('keydown', {keyCode: eventObject.keyCode});
        api.speed(true);
        eventObject.preventDefault();
      }

      // minus
      else if (eventObject.keyCode === 189) {
        track('keydown', {keyCode: eventObject.keyCode});
        api.speed(false);
        eventObject.preventDefault();
      }
    }
  });

  // listen for pause
  api.bind('pause', function(e, api) {
    track('pause');
  });

  // listen for resume
  api.bind('resume', function(e, api) {
    // 
    if (current != api) {
      current.pause();
      current = api;
    }
    track('resume');
  });

  // listen for stop
  api.bind('stop', function(e, api) {
    track('stop');
  });

  // listen for finish
  api.bind('finish', function(e, api) {
    track('finish');
  });

  // listen for unload
  api.bind('unload', function(e, api) {
    track('unload');
  });

  // listen for error
  api.bind('error', function(e, api, error) {
    track('error', error);
  });

  // inject help button
  container.find('.fp-controls').append('<a class="help-button" id="help-button'+ params.number +'"><i class="fa fa-question"></i></a>');

  // override help screen
  $('.fp-ui').after(
    '<div class="fp-help">' +
    '<a class="fp-close" id="fp-close'+ params.number +'"></a>' +
    '<div class="fp-help-section fp-help-basics">' +
    '<p><em>space</em>play / pause</p>' +
    '<p><em>-</em><em>+</em>slower / faster</p>' +
    '</div>' +
    '<div class="fp-help-section">' +
    '<p><em>&#8592;</em><em>&#8594;</em> 8 seconds back / 30 seconds forward</p>' +
    '</div>'
  );

  // listen for clicks for help
  container.find('.help-button').click(function(event) {
    track('click', {target: '#help-button'+params.number});
  container.toggleClass('is-help');
  });

  // close help screen with x
  container.find('.fp-close').click(function(event) {
    track('click', {target: '#fp-close'+params.number});
  container.removeClass('is-help');
  });
}

/** 
 * Builds a unload function with number variable built in
 * @params {int} The number of the video on the page
 */
function makeunloader (num) {
  return function (){
    var d = new Date;

    // get elapsed time
    var timeElapsed = document.getElementById('fp-elapsed' + num).innerHTML;

    // time is formatted HH:MM:SS, so parse into secs
    var ts = timeElapsed.split(':');
    var secsElapsed = 0
    var minsElapsed = 1;
    while (ts.length > 0) {
      secsElapsed += minsElapsed * parseInt(ts.pop(), 10);
      minsElapsed *= 60;
    }

    // get remaining time same way
    var timeLeft = document.getElementById('fp-remaining' + num).innerHTML;
    timeLeft = timeLeft.replace('-','');
    ts = timeLeft.split(':');
    secsLeft = 0
    minsLeft = 1;
    while (ts.length > 0) {
      secsLeft += minsLeft * parseInt(ts.pop(), 10);
      minsLeft *= 60;
    }
    
    // don't save current time if too late in video
    if (secsLeft < 5) {
      localStorage.setItem(document.getElementById('download-button' + num).href, '{"time":0, "date":' + d.getTime() + '}');
    }

    // save current time
    else {
      localStorage.setItem(document.getElementById('download-button' + num).href,'{"time":' + secsElapsed + ', "date":' + d.getTime() + '}');
    }
  };
}

/**
 * Returns a function that takes a source and installs the video player in selector
 * (@param) selector (string) jquery selector, the container to be released
 * (@return) function that takes a video url and installs flowplayer
 */

function installfromiframe (selector, src, number) {
  return function (event) {
    if (src === 'about:blank' || src === event.data[1]) {
      var parameter = {};
      parameter.number = number;
      parameter.source = event.data[0];

      // get locally stored data 
      var hist = JSON.parse(localStorage.getItem(parameter.source));
      if (hist) {
        parameter.time = hist.time;
      }

      if (parameter.source.match(/.mp3$/)) {
        parameter.audio = true;
      }

      // prepare new container
      var container = $('<div/>');

      // maximize player's width
      container.css('margin', '0 0 0 0');
      container.css('padding', '0');
      container.css('width', '100%');

      // replace old container with new
      $(selector).replaceWith(container);
      parameter.title = $('.video-title').text();

      // only have one playing at a time
      if (number == 0 || number == '') {
        parameter.playing = true;
      }
      else {
        parameter.playing = false;
      }

      // install player
      install(container, parameter);
    }
  }
}

// the code that is actually run, if the site is supported, runs the video
if (window.location.hostname === 'cm.dce.harvard.edu' || 
    window.location.hostname === 'matterhorn.dce.harvard.edu') {
  installcmdce();  
} 
else if (window.location.hostname === 'isites.harvard.edu') {  
  installisites();
} 
else if (window.location.hostname === 'icommons.harvard.edu') {
  installicommons();
} 
else if (window.location.hostname === 'canvas.harvard.edu') {
  installcanvas();
} 
else if (window.location.hostname === 'live.cs50.net') {
  installlive();
}
else if (window.location.hostname === 'www.youtube.com') {
  installyoutube();
}
else if (window.location.hostname === 'mediasite.video.harvard.edu') {
  alert('Mediasite already provides 2x functionality, just click the 1x button on the bottom left of the large player');
}
else {
  apologize();
}
