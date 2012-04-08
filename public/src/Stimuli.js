
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
    draw_score(calculate_score());
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
  window.game.scores[window.currentBlock].nativepossible=0;
  window.game.scores[window.currentBlock].nonnativepossible=0;
  window.game.scores[window.currentBlock].nativescore=0;
  window.game.scores[window.currentBlock].nonnativescore=0;
  removeClass(document.getElementById("container"),"hidden");
  //addClass(document.getElementById("spy_score"),"hidden");
  draw_counter(window.countAudioInSet);
};
var calculate_score = function(){
  var pc = 0.01;
  var pm = 0.01;
  var nc = 0.01;
  var nm = 0.01;
  if(window.game.scores[window.currentBlock].nativepossible != 0){
    pc = window.game.scores[window.currentBlock].nativescore/window.game.scores[window.currentBlock].nativepossible;
    pm = 1-pc;
  }
  if(window.game.scores[window.currentBlock].nonnativepossible != 0){
    nc = window.game.scores[window.currentBlock].nonnativescore/window.game.scores[window.currentBlock].nonnativepossible;
    nm = 1-pc;
  }
  debug(pc+","+pm+","+nc+","+nm);
  
  var scores = [];
  scores.push(pc*100);
  scores.push(pm*100);
  scores.push(nc*100);
  scores.push(nm*100);

  return scores;
}
var draw_score = function(scores){
  if(document.getElementById("container")){
    addClass(document.getElementById("container"),"hidden");
  }
  if(document.getElementById("spy_score")){
    removeClass(document.getElementById("spy_score"),"hidden");
  }
  
  /*
  Draw Score
  */
  debug(scores);
  debug("that was teh scores");
  localStorage.setItem("scores",JSON.stringify(scores));

  document.getElementById("nativepositive").value = scores[0];
  document.getElementById("nativemissing").value = scores[1];
  document.getElementById("nonnativepositive").value = scores[2];
  document.getElementById("nonnativemissing").value = scores[3];
  submitForm();

  /*
  TODO Play audio of buss driving a way
  */
  window.countAudioInSet = 0;
  /* Display the score for 3seconds and come back to the game */
  if(window.game){
    window.setTimeout("next_block();",3000);
  }
    
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