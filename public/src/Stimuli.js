
playAudio = function(event, onAudioStarted, onAudioFinished){
  if (window.sIndex == undefined || sIndex >= samples.length) {
    window.sIndex = 0;
  }
  var sample = samples[sIndex++];
 
  debug("Playing : " + sample.uri)
  window.countAudioInSet = window.countAudioInSet || 0;
  window.countAudioInSet++; 
  draw_counter(window.countAudioInSet);


  el = $("<audio></audio>");
  el.attr("src", sample.uri);
  el.get(0).play();
  window.currentAudio=sample.uri;
	
  if(typeof onAudioStarted === 'function'){
		onAudioStarted();
	}
	if(typeof onAudioFinished === 'function'){
		onAudioFinished();
	}
};

playSoundCheckAudio = function(event, callback){
	debug("User clicked play sound check.");
	if(typeof callback === 'function'){
		callback();
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
  var y = 120;
  spy.onload = function(){
    for(x in spys){
      if(x == count){
        ctx.drawImage(spyActive,spys[x],y+Math.random()*3);
      }else{
        ctx.drawImage(spy,spys[x],y+Math.random()*3);
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