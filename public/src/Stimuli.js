
playAudio = function(event, onAudioStarted, onAudioFinished){
  if (window.sIndex == undefined || sIndex >= samples.length) {
    window.sIndex = 0;
  }
  var sample = samples[sIndex++];
 
  debug("Playing : " + sample.uri)
  window.countAudioInSet = window.countAudioInSet || 0;
  window.countAudioInSet++; 
  document.getElementById("countDown").innerHTML= 12-window.countAudioInSet;
 


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
