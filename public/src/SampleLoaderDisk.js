// This is a simple "sample loader" which will load the stimuli
// description from a JSON file on the disk, or from a server.

// Reads in stimuli from a JSON file and calls the callback, if there is one.
var loadStimuliList = function(filename, callback) {
   debug("SampleLoaderDisk:loadStimuliList - Loading stimuli");

   // Get the list of stimuli from the JSON file
   $.getJSON(filename, function(data) {
      // Shuffle the list (so that the game is not always the same) and store it
      window.game.stimuli = _.shuffle(data);

      // Call the callback, if there is one
      if (typeof callback === 'function') {
         callback();
      }
   });
};

// Reads in stimuli from a server
var loadRemoteStimuliList = function(filename) {
   // Get the server from where to download the stimuli
   var logicURL = localStorage.getItem("logicUrl");

   if (logicURL.length > 0) {
      // Form the URL request for the stimuli
      var url = logicURL + "stimuliOrder/" + filename.replace("./../json/audio_stimuli_", "").replace(".json", "") + "?callback=getstimuliorder";
      debug("SampleLoaderDisk:loadRemoteStimuliList - " + url);

      /* QUESTION: Can you please explain this part to me a bit more? Normally
       * the src attribute is used for the URL of another JavaScript file,
       * right? But in this case, it is a url that will return a JSON object.
       * How does this work?
       */
      // To prevent cross site scripting errors, append a script to the document
      debug("\tAdding the stimuli order script to the document.");
      var s = document.createElement("script");
      s.src = url;
      document.body.appendChild(s);
   }
};

// The callback from getting stimuli from a server
var getstimuliorder = function(data) {
   debug("SampleLoaderDisk:getstimuliorder - The stimuli order was downloaded.");

   // Parse the JSON stimuli received from the server
   window.game.stimuli = JSON.parse(data);

   // If we didn't get any stimuli from the server
   if (data == null) {
      /* QUESTION: Where are "filename" and "callback" coming from?
       */
      // Try getting stimuli from the file
      loadStimuliList(filename, callback);
   }

   /* QUESTION: I would suggest that you make this 12 not be hardcoded. Can we
    * make a file like the Android's strings.xml for configuration data?
    */
   // Download the next twelve audio files
   downloadNext12Audio();
};

// Reads in data from a JSON file, stores the data in window.games, and 
// calls the callback, if there is one.
var loadData = function(filename, callback) {
   debug("SampleLoaderDisk:loadData - Will read in data");

   // Get the list of data from the JSON file
   $.getJSON(filename, function(data) {
      // Store the list of data
      window.games = data;
      debug(JSON.stringify(window.games));

      // Call the callback, if there is one
      if (typeof callback === 'function') {
         callback();
      }
   });
};

