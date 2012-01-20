adjustGain = function(event, callback) {
	debug("User adjusted the gain to: "+event.target.value);
	if(typeof callback === 'function'){
		callback();
	}
};
playAudio = function(event, onAudioStarted, onAudioFinished){
	debug("User clicked play.");
	if(typeof onAudioStarted === 'function'){
		onAudioStarted();
	}
	if(typeof onAudioFinished === 'function'){
		onAudioFinished();
	}
};

playSoundCheckAudio = function(event, callback){
	debug("User clicked play sound check.");
	if(typeof callback === 'function'){
		callback();
	}
};