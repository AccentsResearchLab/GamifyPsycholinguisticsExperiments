// Utility functions

// Determine whether the given element already has the given class.
var hasClass = function(ele, cls) {
   return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};

// If it's not already there, add the given class to the given element
var addClass = function(ele, cls) {
   if (!this.hasClass(ele, cls)) {
      ele.className += " " + cls;
   }
};

// If the given element has the given class, remove all occurrences
// of the class from the element.
var removeClass = function(ele, cls) {
   if (hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', 'g');
      ele.className = ele.className.replace(reg, ' ');
   }
};

// Print debug messages to the console.
var debug = function(message) {
   console.log(message);
};

// Print bug message to an alert box.
var bug = function(message) {
   alert(message);
};

// Determine whether the the user is using an Android.
var isAndroidApp = function() {
   //Development tablet navigator.userAgent:
   //Mozilla/5.0 (Linux; U; Android 3.0.1; en-us; gTablet Build/HRI66) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13 
   //console.log(navigator.userAgent.indexOf("Spy or Not"));
   return navigator.userAgent.indexOf("Spy or Not") > -1;
};

// Determine whether the user is using an Android 4.
var isAndroid4 = function() {
   return navigator.userAgent.indexOf("Android 4") > -1;
};

// Determine whether the user is using a Chrome Extension.
var isChromeApp = function() {
   return window.location.href.indexOf("chrome-extension") > -1;
};

// Play the audio from the <div> with the given divid.
// Note: Android 4 is able to play HTML5 audio.
var playAudioFile = function(divid) {
   if (isAndroidApp()) {
      // Use Android JSI method
      Android.playAudio(document.getElementById(divid).src);
   } else {
      // Use HTML5 audio
      document.getElementById(divid).play();
   }
};

// Pause the audio from the <div> with the given divid.
// Note: Android 4 is able to play HTML5 audio.
var pauseAudioFile = function(divid) {
   if (isAndroidApp()) {
      // Use Android JSI method
      Android.pauseAudio();
   } else {
      // Use HTML5 audio
      document.getElementById(divid).pause();
   }
};

// Set the URL that will be used to download audio files.
// Note: Android 4 is able to play HTML5 audio.
var setAudioUrl = function(audiourl) {
   if (isAndroidApp()) {
      var dir = Android.getWifiOrSdcardDir();
      if (dir.length > 0) {
         /* QUESTION: Is there supposed to be something here?
          */
      } else {
         dir = audiourl;
      }
      localStorage.setItem("audioUrl", dir);
   } else {
      // localStorage.setItem("audioUrl","./../"); //same host
      localStorage.setItem("audioUrl", audiourl);
   }

   debug("Util:setAudioUrl - Audio url is set to " + localStorage.getItem("audioUrl"));
};

// Set the URL that will be used to download the game logic.
var setLogicUrl = function(logicUrl) {
   localStorage.setItem("logicUrl", logicUrl);
};

var hideBugFrameOnAndroid = function() {
   if (isAndroidApp()) {
      // If there is a bug frame div, hide it
      var b = document.getElementById("bugframe");
      if (b) {
         b.setAttribute("style", "");
         b.innerHTML = "";
      }

      // If there is a browser test div, hide it
      var r = document.getElementById("browser_test");
      if (r) {
         addClass(r, "hidden");
      }

      // If there is Facebook/Twitter div, hide it and populate the
      //    Android version that uses Android JSI
      var f = document.getElementById("tweet_facebook");
      if (f) {
         addClass(f, "hidden");
         document.getElementById("android_share").innerHTML="<input type='image' src='./../images/share.png' onclick='androidShareIt()' /><div class='sharetext'><span id='share_text_input' ></span></div>";
      }
   }

   if (isChromeApp()) {
      // If there is a bug frame div, hide it
      var b = document.getElementById("bugframe");
      if (b) {
         b.setAttribute("style","");
         b.innerHTML="";
      }
   }
};

hideBugFrameOnAndroid();

