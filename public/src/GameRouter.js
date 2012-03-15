
var GameRouter = Backbone.Router.extend({
	initialize: function(language){
		window.games = JSON.parse(localStorage.getItem("games"));
		this.participant = new ParticipantModel();
		this.activeGame = localStorage.getItem("gameLanguage") 
		if( ! this.activeGame){
			alert("Game language is not set, please click on a language.");
			window.location="soundcheck.html";
		}
		document.getElementById("spytype").innerHTML=games[this.activeGame].language +" ";
		/*
		TODO get user browser and intialize game based on ip addresss
		*/
		debug("Game language is set to "+games[this.activeGame].language);
		this.stimuliJson = games[this.activeGame].stimuliJson;
		loadSamples( this.stimuliJson, this.startGame() );
		
	
	},
	routes: {
		"": "startGame"
	},
	startGame: function(){
		// var el = new GameView().render();
		// $("#gamearea_div").html(el);
		debug("Starting game.");
	}
});


