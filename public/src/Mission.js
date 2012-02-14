
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