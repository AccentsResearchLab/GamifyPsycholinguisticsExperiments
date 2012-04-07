loadData("./../json/game_description.json", null);

setGameLanguage = function(gameindex){
	window.currentGame = gameindex;

	var language = games[currentGame].language;
	debug("Setting language to "+language);
	localStorage.setItem("gameLanguage",currentGame);
	removeClass(document.getElementById("soundcheckbuttons"), "hidden");
	addClass(document.getElementById("choosegamebuttons"), "hidden");
	//playGameMission(currentGame);
	localStorage.setItem( "games", JSON.stringify(games) );
	document.getElementById("mission_text").innerHTML= games[currentGame].description;

	
}
playGameMission = function(){
	debug("Playing mission for "+games[currentGame].language);
	el = $("<audio></audio>");
	el.attr("src", games[currentGame].missionAudio);//TODO put mission audio here
	el.get(0).play();
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
	}else 
	/*
	If the visitor has south african english set, or they are in South Africa, send them to the South African game
	*/
	if(visitor.navigatorlanguage.toLowerCase().indexOf("en-za") > -1 || visitor.httpheaderslanguage.toLowerCase().indexOf("en-za") == 0 || visitor.countrycode.indexOf("ZA") > -1 ){
		rus_button  = false;
		sus_button = false;
	}else
	/*
	If the visitor has british english set, or they are the UK, send them to the Sussex game
	*/
	if(visitor.navigatorlanguage.toLowerCase().indexOf("en-gb") > -1 || visitor.httpheaderslanguage.toLowerCase().indexOf("en-gb") == 0 || visitor.countrycode.indexOf("GB") > -1 ){
		rus_button  = false;
		southaf_button = false;
	}
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