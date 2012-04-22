// This is a simple "sample loader" which will load the stimuli
// description from a json file on the disk, or from a server
loadStimuliList = function(filename, callback) {
  debug("Loading stimuli");
  var logicURL = localStorage.getItem("logicUrl");
  if(logicURL.length > 0){
    console.log(logicURL+"/stimuliOrder/"+filename.replace("./../json/audio_stimuli_","").replace(".json",""));
    $.getJSON(logicURL+"/stimuliOrder/"+filename.replace("./../json/audio_stimuli_","").replace(".json",""), function(data) {
      window.game.stimuli = data;
      
      //TODO if remote data has a problem, load the local one.
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
    debug(JSON.stringify(window.games));
    if(typeof callback === 'function'){
      callback();
    }
 });
};
