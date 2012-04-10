
var GameRouter = Backbone.Router.extend({
	initialize: function(language){
		window.games = JSON.parse(localStorage.getItem("games"));
		this.participant = new ParticipantModel();
		this.scores = [];
		window.currentBlock=0;
		this.scores[0] = {};
		this.scores[0].nativepossible=0;
		this.scores[0].nonnativepossible=0;
		this.scores[0].nativescore=0;
		this.scores[0].nonnativescore=0;
		this.scores[0].prenonnativescore=0;
		this.scores[0].prenonnativepossible=0;
		
		this.activeGame = localStorage.getItem("gameLanguage") 
		if( ! this.activeGame){
			alert("Game language is not set, please click on a language.");
			window.location="soundcheck.html";
		}
		document.getElementById("spytype").innerHTML=games[this.activeGame].adjective +" ";
		document.getElementById("spytype2").innerHTML=games[this.activeGame].language +" ";
		document.getElementById("spytype3").innerHTML=games[this.activeGame].language +" ";
		
		debug("Game language is set to "+games[this.activeGame].language);
		this.stimuliJson = games[this.activeGame].stimuliJson;
		loadSamples( this.stimuliJson, this.startGame() );
		draw_counter(0);
		var visitor = localStorage.getItem("visitor");
		if(visitor){
			visitor = JSON.parse(visitor);
			this.participant.sessionId = visitor.visitorid;
		}
	
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


