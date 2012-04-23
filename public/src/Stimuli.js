
playAudio = function(event){
  /*
  Dont let the user go too fast
  */
  var timepassed = Date.now() - window.currentAudioStartTime;
  if (timepassed < 1000){
    window.audioStatus = window.audioStatus+ " User played audio too fast. "+timepassed;
    debug(window.audioStatus);
    return; 
  }
  /*
  If the block of 12 is done
  */
  if(window.game.countAudioInSet >= 12){
    draw_score(window.game.scores[window.game.currentBlock]);
    return;
  }

  /* Validate the stimuli and stimuli index */
  if(window.game.stimuli == null){
    bug("There was a problem loading the game.");
    return;
  }
  if (window.game.stimuliIndex == undefined || window.game.stimuliIndex >= window.game.stimuli.length) {
    window.game.stimuliIndex = 0;
  }

  /* Play the audio */
  var sample = window.game.stimuli[window.game.stimuliIndex];
  debug("Playing : " + sample.uri)
  el = document.getElementById("stimuli_audio");
  var audiourl = localStorage.getItem("audioUrl");
  el.setAttribute("src", audiourl+sample.uri);
  playAudioFile("stimuli_audio");
  window.currentAudio=sample.uri;
  window.currentAudioStartTime=Date.now();
  window.audioStatus ="Played stimuli "+sample.uri;
  window.lastAction = Date.now();
  /* Increase the count */
  if(window.game.countAudioInSet > -1){
    draw_counter(window.game.countAudioInSet);
    window.game.countAudioInSet++; 
  }else{
    window.game.countAudioInSet = 0;
    draw_counter(window.game.countAudioInSet);

  }
  window.game.stimuliIndex++;
  
  
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
var androidShareIt= function(){
    if(isAndroidApp()){
      Android.shareIt(document.getElementById("share_text_input").value);
    }
}
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
    downloadNext12Audio();
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
    if(el){
      el.setAttribute("data-text","I played #SpyOrNot and got "+percent+" spys!");
    }
    var as = document.getElementById("share_text_input");
    if(as){
      as.value = "I played #SpyOrNot and got "+percent+" spys! http://game.accentsresearch.com";
    }
  }
    
};
draw_counter = function(count){
  var canvas = document.getElementById("counter");
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth-50;
  if(canvas.width >600){
    canvas.width=600;
  }
  canvas.height = canvas.width/3;
  var spydist = canvas.width/15;

  var spys = [12*spydist
      ,11*spydist
      ,10*spydist
      ,9*spydist
      ,8*spydist
      ,7*spydist
      ,6*spydist
      ,5*spydist
      ,4*spydist
      ,3*spydist
      ,2*spydist
      ,spydist];
  var spyActive = new Image();
  var spy = new Image();
  var y =canvas.height*.28;
  spy.onload = function(){
    for(x in spys){
      if(x == count){
        ctx.drawImage(spyActive,spys[x],y+Math.random()*15, canvas.width*.05,canvas.height*.5);
      }else if (x > count){
        ctx.drawImage(spy,spys[x],y+Math.random()*15, canvas.width*.05,canvas.height*.5);
      }
    }
    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img,0,0,canvas.width,canvas.height);
        ctx.fillStyle = "#ccc";
        ctx.font  = 'bold 24px Lobster';
        var busnumber = parseInt(window.game.currentBlock)+1;
        ctx.fillText("#"+busnumber,canvas.width/2,canvas.height*.7);
    };
    img.src = './../images/bus.png';
  };
  spyActive.src = './../images/spybody2.png';  
  spy.src = './../images/spybody.png'; 
};
