// Functions related to the Mission.

// Loads the game description into window.games.
loadData("./../json/game_description.json", null);

// Display the mission text and play the mission audio for the given
// gameindex. Valid game indexes are the valid index in the 
// window.games array.
setGameLanguage = function(gameindex) {
   // Store which language the user wants to play
   window.currentGame = gameindex;

   /* QUESTION: Where do "games" and "currentGame" come from? Are they
    * window.games and window.currentGame?
    */
   var language = games[currentGame].language;
   debug("Mission:setGameLanguage - Setting language to " + language);
   localStorage.setItem("gameLanguage", currentGame);

   // Display the soundcheckbuttons <div>
   removeClass(document.getElementById("soundcheckbuttons"), "hidden");

   // Hide the choose_game <div>
   addClass(document.getElementById("choose_game"), "hidden");

   // Hide the browser_test <div>
   addClass(document.getElementById("browser_test"), "hidden");

   /* QUESTION: Why do we need this? I don't see where it is ever
    * retrieved from localStorage.
    */
   localStorage.setItem("games", JSON.stringify(games));

   // Display the text description of the mission
   /* QUESTION: Why don't we use the description text from window.games?
    */
   document.getElementById("mission_text").innerHTML = "<h3>Your Mission:</h3>" + "<p>So you think you can make for a good spy? Let's see how you are at detecting accents.</p><p> At each bus stop, a new passenger will approach you, and speak one sentence to you. This sentence will be a code, so pay attention closely. </p><p> Now get on the bus and don't forget, we are watching you!</p>";

   // Start the audio description of the mission
   el = document.getElementById("mission_audio");
   el.setAttribute("src", games[currentGame].missionAudio);
   playAudioFile("mission_audio");

   // Add the current language to the user's visitorid
   var visitor = localStorage.getItem("visitor");
   if (visitor) {
      visitor = JSON.parse(visitor);
      visitor["visitorid"] = visitor["visitorid"] + ":::" + language;
      localStorage.setItem("visitor", JSON.stringify(visitor));
   }

   /* QUESTION: I don't see how this part has to do with the game audio.
    */
   // Start loading the game audio
   if (localStorage.getItem("game")) {
      window.game = JSON.parse(localStorage.getItem("game"));
   } else {
      window.game = new GameRouter();
      window.onbeforeunload = function() {
         localStorage.setItem("game", JSON.stringify(window.game));
      };
   }
}

// Play or pause the mission audio depending on whether the 
// event.target.value is that of a pause button or a play button.
// Also keep track of the user's play/pause activity in the
// visitor object.
playGameMission = function(event) {
   if (event.target.value.indexOf("Pause") > -1) {
      // Change the button's text to make it a play button
      event.target.value = "Play Sound Check";

      // Pause the mission audio
      pauseAudioFile("mission_audio");

      // Update the visitor object
      var visitor = localStorage.getItem("visitor");
      if (visitor) {
         visitor = JSON.parse(visitor);
      // Keep track of each time the user pauses the mission audio
         visitor["userlistenedtomission"] = visitor["userlistenedtomission"] + ",Pause:" + Date.now();
         localStorage.setItem("visitor", JSON.stringify(visitor));
      }
   } else {
      // Change the button's text to make it a pause button
      event.target.value = "Pause Sound Check";

      // Play the mission audio
      debug("Mission:playGameMission - Playing mission for " + games[currentGame].language);
      playAudioFile("mission_audio");

      // Update the visitor object
      var visitor = localStorage.getItem("visitor");
      if (visitor) {
         visitor = JSON.parse(visitor);
         // Keep track of how long the mission audio is
         visitor["soundCheckAudioDuration"] = Math.round(el.duration * 1000);
         // Keep track of each time the user plays the mission audio
         visitor["userlistenedtomission"] =  visitor["userlistenedtomission"] + ",Play:" + Date.now();
        localStorage.setItem("visitor", JSON.stringify(visitor));
      }
   }
}

// Based on the user's settings (location, browser language, acceptlanguage),
// try to guess which game (Russia, Sussex, South African) they should play 
// and then only allow them to play that game.
var tryToGuessDialect = function() {
   var rus_button = true;
   var sus_button = true;
   var southaf_button = true;

   // Get data about the user
   var visitor = localStorage.getItem("visitor");
   if (!visitor) {
      return;
   }

   visitor = JSON.parse(visitor);
   // If visitor is currently in Russia, Belarus or Ukraine, or their 
   // browser is in Russian, or if their acceptlanguage starts with Russian
   if ((visitor.navigatorlanguage.toLowerCase().indexOf("ru") > -1) || (visitor.httpheaderslanguage.toLowerCase().indexOf("ru") == 0) || (visitor.countrycode.indexOf("RU") > -1) || (visitor.countrycode.indexOf("BY") > -1) || (visitor.countrycode.indexOf("UA") > -1)) {
      // The Sussex and South Africa buttons should be disabed
      sus_button = false;
      southaf_button = false;

      /* QUESTION: The "0" should be a constant
       */
      // Show the Russia mission
      setGameLanguage(0);

   // If the visitor has South African English set, or they are in South Africa
   } else if ((visitor.navigatorlanguage.toLowerCase().indexOf("en-za") > -1) || (visitor.httpheaderslanguage.toLowerCase().indexOf("en-za") == 0) || (visitor.countrycode.indexOf("ZA") > -1)) {
      // The Russia and Sussex buttons should be disabled
      rus_button = false;
      sus_button = false;

      /* QUESTION: The "2" should be a constant
       */
      // Show the South Africa mission
      setGameLanguage(2);
   }

   var r = document.getElementById("rus_button");
   if (r && !rus_button) {
      // Disable the Russian button
      r.disabled = true;
      r.setAttribute("class", "button");
   }

   var s = document.getElementById("sus_button");
   if (s && !sus_button) {
      // Disable the Sussex button
      s.disabled = true;
      s.setAttribute("class", "button");
   }

   var a = document.getElementById("southaf_button");
   if (a && !southaf_button) {
      // Disable the South African button
      a.disabled = true;
      a.setAttribute("class", "button");
   }
}

// After 2000ms, call tryToGuessDialect
window.setTimeout("tryToGuessDialect();", 2000);

