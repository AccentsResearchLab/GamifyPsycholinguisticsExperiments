
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
  If the block of 12 is done
  */
  if(window.countAudioInSet >= 11){
    draw_score(window.game.scores[window.currentBlock]);
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
  var  dataset = [
        {name: "Not", values: [0, 0 ]},
        {name: "Native", values: [0, 0]},
        {name: "Pre", values: [0, 0]}
        ];
  window.game.scores[window.currentBlock] = dataset;
  removeClass(document.getElementById("game_area"),"hidden");
  addClass(document.getElementById("spy_score"),"hidden");
  draw_counter(window.countAudioInSet);
};

var draw_score = function(dataset){
  if(document.getElementById("game_area")){
    addClass(document.getElementById("game_area"),"hidden");
  }
  if(document.getElementById("spy_score")){
    removeClass(document.getElementById("spy_score"),"hidden");
  }
  
  /*
  Draw Score
  */
  debug(dataset);
  debug("that was teh scores");
  localStorage.setItem("scores",JSON.stringify(dataset));

  document.getElementById("nativepositive").value = dataset[1].values[0]; //corect
  document.getElementById("nativemissing").value = dataset[1].values[1] - dataset[1].values[0]; //total - correct
  if(dataset[1].values[1] == 0){
    document.getElementById("nativepositive").value = 0.001; //put all as missing if there were no stimuli
  }

  document.getElementById("nonnativepositive").value = dataset[0].values[0];
  document.getElementById("nonnativemissing").value = dataset[0].values[1] - dataset[0].values[0]; //total - correct
  if(dataset[0].values[1] == 0){
    document.getElementById("nonnativepositive").value = 0.001; //put all as missing if there were no stimuli
  }

  document.getElementById("prenonnativepositive").value = dataset[2].values[0];
  document.getElementById("prenonnativemissing").value = dataset[2].values[1] - dataset[2].values[0]; //total - correct
  if(dataset[2].values[1] == 0){
    document.getElementById("prenonnativepositive").value = 0.001; //put all as missing if there were no stimuli
  }
  
  submitForm();

  /*
  TODO Play audio of buss driving a way
  */
  window.countAudioInSet = 0;
  /* Display the score for 8 seconds and come back to the game */
  if(window.game){
    window.setTimeout("next_block();",8000);
  }
    
};
draw_counter = function(count){
  var canvas = document.getElementById("counter");
  var ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 200;
  var spys = [500,470,430,400,370,330,300,240,200,160,90,30];
  var spyActive = new Image();
  var spy = new Image();
  var y =60;
  spy.onload = function(){
    for(x in spys){
      if(x == count){
        ctx.drawImage(spyActive,spys[x],y+Math.random()*15);
      }else{
        ctx.drawImage(spy,spys[x],y+Math.random()*15);
      }
    }
    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
    };
    img.src = './../images/bus.png';
  };
  spyActive.src = './../images/spybody2.png';  
  spy.src = './../images/spybody.png'; 

  

};
