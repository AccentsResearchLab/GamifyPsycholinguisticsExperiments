
// Keep track of the current vote and the time the vote was made.
var addVoteDetails = function(newValue) {
   var moment = Date.now();
   window.audioStatus = window.audioStatus + "; (" + newValue + ":" + moment + ")";
   /* QUESTION: Why is this Date.now() instead of moment?
    */
   window.lastAction = Date.now();
}

// Draw the spy meter as a collection of heat-coloured buttons.
// Note: This is a workaround for platforms that do not support the 
// HTML5 slider.
var drawMeter = function() {
   if (isAndroidApp() || (localStorage.getItem("useSlider") == "false")) {
      document.getElementById("justmeter").setAttribute("style","text-align:center;");
      document.getElementById("justmeter").innerHTML =
         '<input value="0" class="hidden" id="meter" onchange="addVoteDetails(event.target.value)" />'
        + '<button value="-5" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#2c59d6;"></button>'
        + '<button value="-4" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#3c52c6;"></button>'
        + '<button value="-3" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#4b4cb8;"></button>'
        + '<button value="-2" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#5d44a4;"></button>'
        + '<button value="-1" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#743b8e;"></button>'
        + '<button value="0" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#7f3782;"></button>'
        + '<button value="1" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#942f6d;"></button>'
        + '<button value="2" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#b12350;"></button>'
        + '<button value="3" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#be1e42;"></button>'
        + '<button value="4" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#d3152d;"></button>'
        + '<button value="5" onclick="transferVoteToMeter(event.target.value)" class="scale" style="background-color:#d91327;"></button>';
   }
};

// Store the given value as the spy meter's value.
// This is used to translate from the heat-coloured buttons version of the
// spy meter to the HTML slider version.
var transferVoteToMeter = function(value) {
   document.getElementById("meter").value = value;
}

var voteMeter = function(newValue) {
   // Calculate how long it's been since the audio started playing
   var timepassed = Date.now() - window.currentAudioStartTime;

   // Calculate how long it's been since the user last clicked
   if (window.lastnextClick) {
      var clicktime = Date.now() - window.lastnextClick;
   } else {
      var clicktime = 2000;
   }

   // Update the time of the user's last click
   window.lastnextClick = Date.now();

   // Dont let the user go too fast
   if ((timepassed < 1000) || (clicktime < 1000)) {
      // Keep track of every time the user clicks too quickly
      window.audioStatus = window.audioStatus + " User clicked Next too fast: " + timepassed + " or " + clicktime;
      debug("AccentMeter:voteMeter - " + window.audioStatus);

      // Display a message to the user to (hopefully) get them to slow down
      var slow_messages = ["Slow down grasshopper...", "Hot potato, hot potato...", "Patience, my child...", "Are you sure you heard the whole pass phrase?"];
      bug(slow_messages[Math.round(Math.random() * 3)]);

      return; 
   }

   // Play a click noise
   playAudioFile("click_sound");

   // Auto advance to next Audio Stimuli after 1 seconds
   window.setTimeout("playAudio(event)", 1000);
	
   // Dont record as a vote if the button said start
   if (document.getElementById("playButton").value.indexOf("Start") > -1) {
      // Change the start button into the next button
      document.getElementById("playButton").value = "Next";

      return;
   }

   // Don't let the user vote 0 too many times in a row
   window.lazyzerocount = window.lazyzerocount || 0;
   if (window.lazyzerocount > 2) {
      // Keep track of every time the user clicks 0 too often
      /* QUESTION: "alerted them with to use"?
       */
      window.audioStatus = window.audioStatus + "User is voting zero a lot, alerted them with to use actually vote. ";

      // Display message to the user to (hopefully) get them to make real votes
      var slow_messages = ["Wow... you wouldn't make a good spy.", "Are you sure you're from " + window.game.language + "?", "You had better get your hearing checked.", "Don't forget, we are watching you!"];
      bug(slow_messages[Math.round(Math.random() * 3)]);

      // Reset the number of times in a row that the user has voted 0
      window.lazyzerocount = 0;
   } else {
      if (newValue == 0) {
         // Increment the number of times in a row that the user has voted 0
         window.lazyzerocount++;
      } else {
         // Reset the number of times in a row that the user has voted 0
         window.lazyzerocount = 0;
      }
   }

   // Create a vote object based on the user, the audio, and the user's vote
   var el = document.getElementById("stimuli_audio");
   var audioDuration = Math.round(el.duration * 1000);
   var vote = {};
   vote.participantId = window.game.participant.sessionId;
   vote.audio = window.currentAudio;
   vote.audioDuration = audioDuration;
   vote.totalTime = Date.now() - window.currentAudioStartTime;
   vote.reactionTime = vote.totalTime - audioDuration;
   vote.details = audioDuration + ":::" + window.audioStatus;
   vote.value = newValue;

   /* QUESTION: When sould window.currentAudio be null?
    */
   if (window.currentAudio) {
      // Keep track of the vote object
      localStorage.setItem("vote", JSON.stringify(vote));

      // Score the participant's vote
      var dataset = window.game.scores[window.game.currentBlock];
      var nonnative = window.currentAudio.match(/[0-9][0-9]/);
      var pretest = window.currentAudio.match(/pre/);
      if (pretest) {
         /* QUESTION: Where is dataset coming from?
          */
         // Augment the total of pre-test speakers
         dataset[2].values[1]++;
         // Add a fraction of points based on their vote, assuming the correct vote is -5
         dataset[2].values[0] += - (-5 + parseInt(vote.value)) / 10;
      } else if (nonnative) {
         // Augment the total notnative speakers
         dataset[0].values[1]++;
         // Always give them 5 points, plus a random fraction of points, assuming equal distribution around 0 is the best score for nonnative speakers
         dataset[0].values[0] += (5 + Math.random()*5) / 10;
      } else {
         // Augment the total native speakers
         dataset[1].values[1]++;
         // Add a fraction of points based on their vote, assuming 5 is the correct vote for native speakers
         dataset[1].values[0] += (5 + parseInt(vote.value)) / 10;
      }
      debug("AccentMeter:voteMeter - " + JSON.stringify(dataset));
   }

   // Keep track of all the votes so far
   window.votes = window.votes || [];
   window.votes.push(vote);
   localStorage.setItem("votes", JSON.stringify(window.votes));

   // Set a return point so the user can continue their game later
   localStorage.setItem("game", JSON.stringify(window.game));

   // Record the vote
   document.getElementById("vote_frame").setAttribute("src", "vote.html");

   // Call the callback, if there is one
   if (typeof callback === 'function') {
      callback();
   }

   // Reset the vote meter to 0
   document.getElementById("meter").value = 0;
   document.getElementById("playButton").value = "Next";
};

