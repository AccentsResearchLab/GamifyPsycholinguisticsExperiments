var drawOnCanvas = function (){
	var canvas = document.getElementById("accent_meter");
	var ctx = canvas.getContext("2d");
	canvas.width = 160;
	canvas.height = 500;
	var img = new Image();
	    img.onload = function(){
	      ctx.drawImage(img,0,0,canvas.width,canvas.height);
	      /*TODO draw the scale */
	      ;
	    };
 	img.src = './../images/meter.png';
};

var voteMeter = function(newValue)
{
	
	var vote = {};
	vote.audio = window.currentAudio;
	
	vote.value = newValue;
	
	window.votes = window.votes || [];
	window.votes.push(vote);
	localStorage.setItem("votes",JSON.stringify(window.votes));
	debug("User voted: "+JSON.stringify(window.votes));
		
	/*
	Play a click
	*/
	document.getElementById("click_sound").play();

	/*
	Auto advance to next Audio Stimuli after 3 seconds
	*/
	window.setTimeout("playAudio(event)",3000);
	
	if(typeof callback === 'function'){
		callback();
	}
	//document.getElementById("accent_meter").value=0;
};