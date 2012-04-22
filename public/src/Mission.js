loadData("./../json/game_description.json", null);
    
  
setGameLanguage = function(gameindex){
	window.currentGame = gameindex;

	var language = games[currentGame].language;
	debug("Setting language to "+language);
	localStorage.setItem("gameLanguage",currentGame);
	removeClass(document.getElementById("soundcheckbuttons"), "hidden");
	addClass(document.getElementById("choose_game"), "hidden");
	addClass(document.getElementById("browser_test"), "hidden");
	//playGameMission(currentGame);
	localStorage.setItem( "games", JSON.stringify(games) );
	document.getElementById("mission_text").innerHTML= "<h3>Your Mission:</h3>"+games[currentGame].description;
	el = document.getElementById("mission_audio");
	el.setAttribute("src", games[currentGame].missionAudio);
	playAudioFile("mission_audio");
	var visitor = localStorage.getItem("visitor");
	if(visitor){
		visitor = JSON.parse(visitor);
		visitor["visitorid"] = visitor["visitorid"] +":::"+language;
		localStorage.setItem("visitor",JSON.stringify(visitor));
	}

	/* srart loading the game audio */
	if(localStorage.getItem("game")){
      window.game = JSON.parse(localStorage.getItem("game"));
    }else{
      window.game = new GameRouter();
      window.onbeforeunload = function(){
      	localStorage.setItem("game",JSON.stringify(window.game));
      };
    }
  
}
playGameMission = function(event){
	if(event.target.value =="Pause"){
		event.target.value = "Play Sound Check";
		pauseAudioFile("mission_audio");
		var visitor = localStorage.getItem("visitor");
		if(visitor){
			visitor = JSON.parse(visitor);
			visitor["userlistenedtomission"] = visitor["userlistenedtomission"] +",Pause:"+ Date.now();
			localStorage.setItem("visitor",JSON.stringify(visitor));
		}
		return;
	}
	debug("Playing mission for "+games[currentGame].language);
	playAudioFile("mission_audio");
	event.target.value="Pause";

	var visitor = localStorage.getItem("visitor");
	if(visitor){
		visitor = JSON.parse(visitor);
		visitor["soundCheckAudioDuration"] = Math.round(el.duration*1000);
		visitor["userlistenedtomission"] =  visitor["userlistenedtomission"] +",Play:"+ Date.now();
		localStorage.setItem("visitor",JSON.stringify(visitor));
	}
}

var tryToGuessDialect = function(){
	var visitor = localStorage.getItem("visitor");
	if(!visitor){
		return;
	}
	var rus_button = true;
	var sus_button = true;
	var southaf_button = true;

	visitor = JSON.parse(visitor);
	/*
	If visitor is currently in Russia, Belarus or Ukraine send them to the Russian game, 
	or their browser is in russian, 
	or if their acceptlanguage starts with russian.
	*/
	if (visitor.navigatorlanguage.toLowerCase().indexOf("ru") > -1 || visitor.httpheaderslanguage.toLowerCase().indexOf("ru") == 0 || visitor.countrycode.indexOf("RU") > -1 || visitor.countrycode.indexOf("BY") > -1 || visitor.countrycode.indexOf("UA") > -1 ){
		sus_button = false;
		southaf_button = false;
		setGameLanguage(0);
	}else 
	/*
	If the visitor has south african english set, or they are in South Africa, send them to the South African game
	*/
	if(visitor.navigatorlanguage.toLowerCase().indexOf("en-za") > -1 || visitor.httpheaderslanguage.toLowerCase().indexOf("en-za") == 0 || visitor.countrycode.indexOf("ZA") > -1 ){
		rus_button  = false;
		sus_button = false;
		setGameLanguage(2);
	}
	// else
	// /*
	// If the visitor has british english set, or they are the UK, send them to the Sussex game
	// */
	// if(visitor.navigatorlanguage.toLowerCase().indexOf("en-gb") > -1 || visitor.httpheaderslanguage.toLowerCase().indexOf("en-gb") == 0 || visitor.countrycode.indexOf("GB") > -1 ){
	// 	rus_button  = false;
	// 	southaf_button = false;
	// 	setGameLanguage(1);
	// }
	var r = document.getElementById("rus_button");
	var s = document.getElementById("sus_button");
	var a = document.getElementById("southaf_button");
	if(r && !rus_button){
		r.disabled=true;
		r.setAttribute("class","button");

	}
	if(s && !sus_button){
		s.disabled=true;
		s.setAttribute("class","button");
	}
	if(a && !southaf_button){
		a.disabled=true;
		a.setAttribute("class","button");
	}


}
window.setTimeout("tryToGuessDialect();", 2000);