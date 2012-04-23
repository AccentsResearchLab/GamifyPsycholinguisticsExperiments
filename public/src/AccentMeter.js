
var addVoteDetails = function(newValue){
	var moment = Date.now();
	window.audioStatus = window.audioStatus + "; (" + newValue + ":" + moment+")";
	window.lastAction = Date.now();
}
var drawMeter = function(){
	if(isAndroidApp()|| localStorage.getItem("useSlider")  == "false"){
		document.getElementById("justmeter").setAttribute("style","text-align:center;");
		document.getElementById("justmeter").innerHTML=
		'<input value="0" class="hidden" id="meter" onchange="addVoteDetails(event.target.value)" />'
		+'<button value="-5" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#2c59d6;"></button>'
		+'<button value="-4" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#3c52c6;"></button>'
		+'<button value="-3" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#4b4cb8;"></button>'
		+'<button value="-2" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#5d44a4;"></button>'
		+'<button value="-1" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#743b8e;"></button>'
		+'<button value="0" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#7f3782;"></button>'
		+'<button value="1" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#942f6d;"></button>'
		+'<button value="2" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#b12350;"></button>'
		+'<button value="3" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#be1e42;"></button>'
		+'<button value="4" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#d3152d;"></button>'
		+'<button value="5" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#d91327;"></button>';
	}
};
var transferVoteToMeter = function(value){
	document.getElementById("meter").value= value;
}
var voteMeter = function(newValue)
{
	document.getElementById("playButton").value = "Next";
	
	/*
	Dont let the user go too fast
	*/
	var timepassed = Date.now() - window.currentAudioStartTime;
	if(window.lastnextClick){
		var clicktime = Date.now() - window.lastnextClick;
	}else{
		var clicktime= 2000;
	}
	window.lazyzerocount = window.lazyzerocount || 0;
	if(window.lazyzerocount >2){
		window.audioStatus = window.audioStatus+ "User is voting zero a lot, alerted them with to use actually vote. ";
		var slow_messages = ["Wow... you wouldn't make a good spy.","Are you sure you're from "+window.game.language+"?","You had better get your hearing checked.","Don't forget, we are watching you!"];
	    window.lazyzerocount =0;
	    bug(slow_messages[Math.round(Math.random()*3)]);
	}else{
		if(newValue == 0){
		 	window.lazyzerocount++;
		 }else{
		 	window.lazyzerocount =0;
		 }
	}
	if (timepassed < 1000 || clicktime < 1000){
	    window.audioStatus = window.audioStatus+ " User clicked Next too fast: "+timepassed+" or "+clicktime;
	    var slow_messages = ["Slow down grasshopper...","Hot potato, hot potato...","Patience, my child...","Are you sure you heard the whole pass phrase?"];
	    bug(slow_messages[Math.round(Math.random()*3)]);
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
		var dataset =window.game.scores[window.game.currentBlock];

		var nonnative = window.currentAudio.match(/[0-9][0-9]/);
		var pretest = window.currentAudio.match(/pre/);

		if( pretest ){
			dataset[2].values[1]++; //augment the total of pre-test speakers
			dataset[2].values[0]+= - (-5 + parseInt(vote.value))/10; //add a fraction of points based on their vote, assuming the correct vote is -5
		}else if( nonnative ){
			dataset[0].values[1]++; //augment the total notnative speakers
			dataset[0].values[0]+= (5 + Math.random()*5)/10; //always give them 5 points, plus a random fraction of points, assuming equal distribution around 0 is the best score for nonnative speakers
		}else{
			dataset[1].values[1]++; //augment the total native speakers
			dataset[1].values[0]+= (5 + parseInt(vote.value))/10; //add a fraction of points based on their vote, assuming 5 is the correct vote for native speakers
		}
		debug(JSON.stringify(dataset));
	}
	
	window.votes = window.votes || [];
	window.votes.push(vote);
	localStorage.setItem("votes",JSON.stringify(window.votes));
	/* Set a return point so the user can come back */
  	localStorage.setItem("game",JSON.stringify(window.game));	
	/*
	Play a click
	*/
	playAudioFile("click_sound");

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