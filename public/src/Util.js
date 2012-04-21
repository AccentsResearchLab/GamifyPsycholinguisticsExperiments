
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
	console.log(navigator.userAgent.indexOf("Spy or Not"));
	return navigator.userAgent.indexOf("Spy or Not") > -1;
}
playAudioFile = function(divid){
	if(isAndroidApp()){
		Android.playAudio(document.getElementById(divid).src);
	}else{
		document.getElementById(divid).play();
	}
}
pauseAudioFile = function(divid){
	if(isAndroidApp()){
		Android.pauseAudio();
	}else{
		document.getElementById(divid).pause();
	}
}
