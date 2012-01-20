// This is a simple "sample loader" which will load the samples
// description from a json file on the disk
loadSamples = function(callback) {
  $.getJSON("./../samples.json", function(data) {
    window.samples = _.shuffle(data);
    if(typeof callback === 'function'){
      callback();
    }
 });
};

$(function(){
  loadSamples();
});
