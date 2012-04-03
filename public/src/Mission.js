loadData("./../json/game_description.json", null);

setGameLanguage = function(event){
	window.currentGame = event.target.value;

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