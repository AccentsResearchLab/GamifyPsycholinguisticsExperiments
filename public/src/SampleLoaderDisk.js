// This is a simple "sample loader" which will load the stimuli
// description from a json file on the disk, or from a server
loadStimuliList = function(filename, callback) {
  debug("Loading stimuli");
  $.getJSON(filename, function(data) {
      window.game.stimuli = _.shuffle(data);
      if(typeof callback === 'function'){
        callback();
      }
  });
};
loadRemoteStimuliList = function(filename,callback){
  var logicURL = localStorage.getItem("logicUrl");
  if(logicURL.length > 0){
    debug(logicURL+"stimuliOrder/"+filename.replace("./../json/audio_stimuli_","").replace(".json","")+"?callback=getstimuliorder");
    /* To prevent cross site scripting errors, append a script to the document */   
    var s = document.createElement("script");
    s.src = logicURL+"stimuliOrder/"+filename.replace("./../json/audio_stimuli_","").replace(".json","")+"?callback=getstimuliorder";
    debug("\tAdding the stimuli order script to the document.");
    document.body.appendChild(s);
  }
};
var getstimuliorder = function(data){
  debug("The stimuli order was downloaded.");
  window.game.stimuli = JSON.parse(data);
  if(data == null){
        loadStimuliList(filename,callback);
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
