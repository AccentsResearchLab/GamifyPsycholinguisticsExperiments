
vote = function(event, callback){
	

	var vote = {};
	vote.audio = window.currentAudio;
	
	if(event.target){
		vote.value = event.target.value;
	}else{
		vote.value = event;

	}
	window.votes = window.votes || [];
	window.votes.push(vote);
	localStorage.setItem("votes",JSON.stringify(window.votes));
	debug("User voted: "+JSON.stringify(window.votes));
		
	/*
	Play a click
	*/
	document.getElementById("click_sound").play();

	/*
	Play next Audio
	*/
	window.setTimeout("playAudio(event)",500);
	if(typeof callback === 'function'){
		callback();
	}
};
