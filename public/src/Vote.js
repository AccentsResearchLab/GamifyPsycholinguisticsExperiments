
vote = function(event, callback){
	
	var vote = {};
	vote.audio = window.currentAudio;
	
	if(event.target){
		debug("User voted: "+event.target.value);
		vote.value = event.target.value;
	}else{
		debug("User voted: "+event);
		vote.value = event;

	}
	window.votes = window.votes || [];
	window.votes.push(vote);
	localStorage.setItem("votes",JSON.stringify(window.votes));
	
	/*
	Play next Audio
	*/
	window.setTimeout("playAudio(event)",500);
	if(typeof callback === 'function'){
		callback();
	}
};
