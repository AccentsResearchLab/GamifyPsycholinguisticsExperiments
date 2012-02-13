// This is a simple "sample loader" which will load the samples
// description from a json file on the disk
loadSamples = function(gameAudio, callback) {
  $.getJSON(gameAudio, function(data) {
    window.samples = _.shuffle(data);
    if(typeof callback === 'function'){
      callback();
    }
 });
};

$(function(){
  loadSamples("./../json/audio_stimuli.json");
});
