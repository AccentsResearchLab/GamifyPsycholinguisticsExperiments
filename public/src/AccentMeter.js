var drawOnCanvas = function (){
	var canvas = document.getElementById("accent_meter");
	var ctx = canvas.getContext("2d");
	canvas.width = 160;
	canvas.height = 500;
	var img = new Image();
	    img.onload = function(){
	      ctx.drawImage(img,0,0,canvas.width,canvas.height);
	      
	    };
 	img.src = './../images/meter.png';
};
var addVoteDetails = function(newValue){
	var moment = Date.now();
	window.audioStatus = window.audioStatus + "; (" + newValue + ":" + moment+")";
	window.lastAction = Date.now();
}

var voteMeter = function(newValue)
{
	
	document.getElementById("playButton").value = "Next                                  ";
	
	/*
	Dont let the user go too fast
	*/
	var timepassed = Date.now() - window.currentAudioStartTime;
	if(window.lastnextClick){
		var clicktime = Date.now() - window.lastnextClick;
	}else{
		var clicktime= 2000;
	}
	if (timepassed < 1000 || clicktime < 1000){
	    window.audioStatus = window.audioStatus+ " User clicked Next too fast: "+timepassed+" or "+clicktime;
	    debug(window.audioStatus);
	    window.lastnextClick = Date.now();
	    return; 
	}
	window.lastnextClick = Date.now();



	var el = document.getElementById("stimuli_audio");
  	var audioDuration = Math.round(el.duration*1000);
  

	var vote = {};
	vote.participantId = window.game.participant.sessionId;
	vote.audio = window.currentAudio;
	vote.audioDuration = audioDuration;
	vote.totalTime = Date.now() - window.currentAudioStartTime;
	vote.reactionTime = vote.totalTime - audioDuration;
	vote.details = audioDuration+":::"+window.audioStatus;

	vote.value = newValue;
	if(window.currentAudio){
		localStorage.setItem("vote",JSON.stringify(vote));
		/*
		Score the participant's vote
		*/
		var matches = window.currentAudio.match(/[0-9][0-9]/);
		var machespre = window.currentAudio.match(/pre/);
		if(!matches){
			window.game.scores[window.currentBlock].nativepossible++;
			window.game.scores[window.currentBlock].nativescore = window.game.scores[window.currentBlock].nativescore + (5+ parseInt(vote.value))/10;
		}else if(machespre){
			window.game.scores[window.currentBlock].prenonnativepossible++;
			window.game.scores[window.currentBlock].prenonnativescore = window.game.scores[window.currentBlock].prenonnativescore - (-5+ parseInt(vote.value))/10;
		}else{
			window.game.scores[window.currentBlock].nonnativepossible++;
			window.game.scores[window.currentBlock].nonnativescore = window.game.scores[window.currentBlock].nonnativescore + (5- parseInt(vote.value))/10;
		}
		debug("Scores native "
			+window.game.scores[window.currentBlock].nativescore
			+"/"+window.game.scores[window.currentBlock].nativepossible
			+", nonnative "
			+window.game.scores[window.currentBlock].nonnativescore
			+"/"+window.game.scores[window.currentBlock].nonnativepossible);
	}
	
	window.votes = window.votes || [];
	window.votes.push(vote);
	localStorage.setItem("votes",JSON.stringify(window.votes));
	//debug("User voted: "+JSON.stringify(window.votes));
		
	/*
	Play a click
	*/
	document.getElementById("click_sound").play();

	/*
	Auto advance to next Audio Stimuli after 1 seconds
	*/
	window.setTimeout("playAudio(event)",1000);
	
	/*
	Record the vote
	*/
	document.getElementById("vote_frame").setAttribute("src","vote.html");

	if(typeof callback === 'function'){
		callback();
	}
	/*
	Reset the vote meter to 0
	*/
	document.getElementById("meter").value=0;
};