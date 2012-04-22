
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

  if (window.game.stimuliIndex == undefined || window.game.stimuliIndex >= window.game.samples.length) {
    window.game.stimuliIndex = 0;
  }
  var sample = window.game.samples[window.game.stimuliIndex++];
 
  debug("Playing : " + sample.uri)
  
  if(window.game.countAudioInSet > -1){
    draw_counter(window.game.countAudioInSet);
    window.game.countAudioInSet++; 
  }else{
    window.game.countAudioInSet = 0;
    draw_counter(window.game.countAudioInSet);

  }
  /*
  If the block of 12 is done
  */
  if(window.game.countAudioInSet >= 12){
    draw_score(window.game.scores[window.game.currentBlock]);
    return;
  }
  

  el = document.getElementById("stimuli_audio");
  var audiourl = localStorage.getItem("audioUrl");
  el.setAttribute("src", audiourl+sample.uri);
  playAudioFile("stimuli_audio");
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
  window.game.currentBlock++;
  var  dataset = [
        {name: "Not", values: [0, 0 ]},
        {name: "Native", values: [0, 0]},
        {name: "Pre", values: [0, 0]}
        ];
  window.game.scores[window.game.currentBlock] = dataset;
  if(document.getElementById("game_area")){
    removeClass(document.getElementById("game_area"),"hidden");
    addClass(document.getElementById("spy_score"),"hidden");
    draw_counter(window.game.countAudioInSet);
  }
  localStorage.setItem("game",JSON.stringify(window.game)); 
    
  
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
  //debug(dataset);
  debug("that was the scores");
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
  Play audio of buss driving away
  */
  if(document.getElementById("bus_audio")){
    playAudioFile("bus_audio");
  }

  /* Display the score for 8 seconds and come back to the game */
  if(document.getElementById("game_area")){
    window.game.countAudioInSet = 0;
    window.setTimeout("next_block();",8000);
  }
  if(document.getElementById("percent_score")){
    var score = 0;
    var total = 0;

    score += dataset[0].values[0];
    score += dataset[1].values[0];
    score += dataset[2].values[0];

    total += dataset[0].values[1];
    total += dataset[1].values[1];
    total += dataset[2].values[1];
    
    var percent = Math.round(score*10)/10+"/"+total;
    document.getElementById("percent_score").innerHTML=percent;
    var el = document.getElementById("twitter_el");
    el.setAttribute("data-text","I played #SpyOrNot and got "+percent+" spys!");
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
      }else if (x > count){
        ctx.drawImage(spy,spys[x],y+Math.random()*15);
      }
    }
    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#ccc";
        ctx.font  = 'bold 26px Lobster';
        var busnumber = parseInt(window.game.currentBlock)+1;
        ctx.fillText("#"+busnumber,300,140);
    };
    img.src = './../images/bus.png';
  };
  spyActive.src = './../images/spybody2.png';  
  spy.src = './../images/spybody.png'; 

  

};
