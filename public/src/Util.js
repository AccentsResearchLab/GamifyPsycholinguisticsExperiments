
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

setGameLanguage = function(event){
	debug("Setting language to "+event.target.value);
	localStorage.setItem("gameLanguage",event.target.value);
	removeClass(document.getElementById("soundcheckbuttons"), "hidden");
	addClass(document.getElementById("choosegamebuttons"), "hidden");
	playGameMission(event.target.value);
	
}
playGameMission = function(lang){
	debug("Playing mission for "+lang);
	el = $("<audio></audio>");
	if(lang == "Russian"){
		el.attr("src", "./../audio_stimuli/SbeatD.wav");//TODO put mission audio here
	}else if(lang=="Sussex"){
		el.attr("src", "./../audio_stimuli/SbeatD.wav");//TODO put mission audio here
	}else if(lang=="South African"){
		el.attr("src", "./../audio_stimuli/SbeatD.wav");//TODO put mission audio here
	}
	el.get(0).play();
}