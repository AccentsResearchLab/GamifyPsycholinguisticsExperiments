// This is a simple "sample loader" which will load the samples
// description from a json file on the disk
loadSamples = function(filename, callback) {
  $.getJSON(filename, function(data) {
    window.game.samples = _.shuffle(data);
    if(typeof callback === 'function'){
      callback();
    }
 });
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
