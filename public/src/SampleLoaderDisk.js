// This is a simple "sample loader" which will load the samples
// description from a json file on the disk
loadSamples = function(filename, callback) {
  var logicURL = localStorage.getItem("logicUrl");
  if(logicURL.length > 0){
    console.log(logicURL+"/stimuliOrder/"+filename.replace("./../json/audio_stimuli_","").replace(".json",""));
    $.getJSON(logicURL+"/stimuliOrder/"+filename.replace("./../json/audio_stimuli_","").replace(".json",""), function(data) {
      window.game.stimuli = data;
      if(typeof callback === 'function'){
        callback();
      }
    });
  }else{
    $.getJSON(filename, function(data) {
      window.game.stimuli = _.shuffle(data);
      if(typeof callback === 'function'){
        callback();
      }
    });
  }
};

loadData = function(filename, callback){
	debug("will read in data");
  $.getJSON(filename, function(data) {
  	window.games = data;
    if(typeof callback === 'function'){
      callback();
    }
 });
};
