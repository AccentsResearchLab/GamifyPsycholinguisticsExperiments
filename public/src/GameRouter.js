
var GameRouter = Backbone.Router.extend({
	initialize: function(language){
		this.participant = new ParticipantModel();
		this.games = ["Russian","Sussex","South African"];
		this.activeGame = localStorage.getItem("gameLanguage") 
		if( ! this.activeGame){
			alert("Game language is not set, please click on a language.");
			window.location="soundcheck.html";
		}
		/*
		TODO get user browser and intialize game based on ip addresss
		*/
		debug("Game language is set to "+this.activeGame);
		this.stimuliJson = "";
		if(this.activeGame ==="Russian"){
			this.stimuliJson ="./../json/audio_stimuli_russian.json";
		}else if(this.activeGame ==="Sussex"){
			this.stimuliJson ="./../json/audio_stimuli_sussex.json";
		}else if(this.activeGame ==="South African"){
			this.stimuliJson ="./../json/audio_stimuli_southafrican.json";
		}
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


