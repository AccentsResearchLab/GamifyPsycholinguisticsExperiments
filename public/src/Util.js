
/*
 * Adding and removing class on DOM elements in a safe manner
 * incase there are mulitiple classes
 */
function hasClass(ele,cls) {
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
  if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)','g');
      ele.className=ele.className.replace(reg,' ');
  }
}

debug = function(message){
	console.log(message);
};
bug = function(message){
	alert(message);
}
isAndroidApp = function() {
	//Development tablet navigator.userAgent:
	//Mozilla/5.0 (Linux; U; Android 3.0.1; en-us; gTablet Build/HRI66) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13 
	//console.log(navigator.userAgent.indexOf("Spy or Not"));
	return navigator.userAgent.indexOf("Spy or Not") > -1;
}
isAndroid4 = function(){
	return navigator.userAgent.indexOf("Android 4") > -1;
}
playAudioFile = function(divid){
	/*
	Android 4 plays HTML5 audio
	*/
	if( isAndroidApp() ){
		Android.playAudio(document.getElementById(divid).src);
	}else{
		document.getElementById(divid).play();
	}
}
pauseAudioFile = function(divid){
	/*
	Android 4 plays HTML5 audio
	*/
	if( isAndroidApp()  ){
		Android.pauseAudio();
	}else{
		document.getElementById(divid).pause();
	}
}
var setAudioUrl = function(audiourl){
	if(isAndroidApp()){
		var dir = Android.getWifiOrSdcardDir();
		if (dir.length > 0){
			
		}else{
			dir =  audiourl;
		}
		localStorage.setItem("audioUrl",dir);
	}else{
		// localStorage.setItem("audioUrl","./../"); //same host
		localStorage.setItem("audioUrl",audiourl);
	}
	debug("Audio url is set to "+localStorage.getItem("audioUrl") );
};
var setLogicUrl = function(logicUrl){
	localStorage.setItem("logicUrl",logicUrl);
}

var hideBugFrameOnAndroid = function(){
	if(isAndroidApp()){
		var b = document.getElementById("bugframe");
		if(b){
			b.setAttribute("style","");
			b.innerHTML="";
		}
		var r = document.getElementById("browser_test");
		if(r){
			addClass(r,"hidden");
		}
		var v = document.getElementById("spy_score");
		if (v && !isAndroid4()){
			addClass(v,"hidden");
		}
	}
}
hideBugFrameOnAndroid();
