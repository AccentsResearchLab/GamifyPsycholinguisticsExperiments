
playAudio = function(event, onAudioStarted, onAudioFinished){
  /*
  Dont let the user go too fast
  */
  var timepassed = Date.now() - window.currentAudioStartTime;
  if (timepassed < 1000){
    window.audioStatus = window.audioStatus+ " User played audio too fast. "+timepassed;
    debug(window.audioStatus);
    return; 
  }

  if (window.sIndex == undefined || sIndex >= samples.length) {
    window.sIndex = 0;
  }
  var sample = samples[sIndex++];
 
  debug("Playing : " + sample.uri)
  if(window.countAudioInSet > -1){
    window.countAudioInSet++; 
  }else{
    window.countAudioInSet= 0;
  }
  /*
  If the block is done
  */
  if(window.countAudioInSet >=3){
    draw_score();
    return;
  }
  draw_counter(window.countAudioInSet);


  el = document.getElementById("stimuli_audio");
  el.setAttribute("src", sample.uri);
  el.play();
  window.currentAudio=sample.uri;
  window.currentAudioStartTime=Date.now();
  window.audioStatus ="Played stimuli "+sample.uri;
  window.lastAction = Date.now();
	
  if(typeof onAudioStarted === 'function'){
		onAudioStarted();
	}
	if(typeof onAudioFinished === 'function'){
		onAudioFinished();
	}
};
next_block = function(){
  window.currentBlock++;
  window.game.scores[window.currentBlock] ={};
  removeClass(document.getElementById("container"),"hidden");
  addClass(document.getElementById("spy_score"),"hidden");
  draw_counter(window.countAudioInSet);
};
draw_score = function(){
  addClass(document.getElementById("container"),"hidden");
  removeClass(document.getElementById("spy_score"),"hidden");
  
  /*
  Draw Score
  */
  document.getElementById("spy_score").innerHTML="Scores Native "
      +window.game.scores[window.currentBlock].nativescore
      +"/"+window.game.scores[window.currentBlock].nativepossible
      +", nonnative "
      +window.game.scores[window.currentBlock].nonnativescore
      +"/"+window.game.scores[window.currentBlock].nonnativepossible;


  /*
  TODO Play audio of buss driving a way
  */

  window.countAudioInSet = 0;
  /* Display the score for 3seconds and come back to the game */
  window.setTimeout("next_block();",3000);
    
};
draw_counter = function(count){
  

  var canvas = document.getElementById("counter");
  var ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 290;
  var spys = [500,470,430,400,370,340,300,250,210,170,100,50];
  var spyActive = new Image();
  var spy = new Image();
  var y = 115;
  spy.onload = function(){
    for(x in spys){
      if(x == count){
        ctx.drawImage(spyActive,spys[x],y+Math.random()*15);
      }else{
        ctx.drawImage(spy,spys[x],y+Math.random()*15);
      }
    }
  };
  spyActive.src = './../images/spyOrNot.png';  
  spy.src = './../images/spy.png';  

  var img = new Image();
  img.onload = function(){
      ctx.drawImage(img,0,0,canvas.width,canvas.height);
      /*TODO draw the scale */
      ;
  };
  img.src = './../images/bus.png';

};