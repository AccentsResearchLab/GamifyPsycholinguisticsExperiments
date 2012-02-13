
vote = function(event, callback){
	if(event.target){
		debug("User voted: "+event.target.value);
	}else{
		debug("User voted: "+event);
	}
	window.setTimeout("playAudio(event)",500);
	if(typeof callback === 'function'){
		callback();
	}
};
