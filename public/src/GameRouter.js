var GameView = Backbone.View.extend({
	template: _.template($("#game_view").html()),
	render: function(){
		$(this.el).html(this.template());
		return this.el;
	},
	events : {
		"click #hello" : "sayHello"
	},
	sayHello : function(){
		alert("hello");
	}
});

var GameRouter = Backbone.Router.extend({
	initialize: function(language){
		this.participant = new ParticipantModel();
		this.games = ["Russian","Sussex","South African"];
		this.activeGame = language || "Russian";
		/*
		TODO get user browser and intialize game based on ip addresss
		*/
		debug("Game language is set to "+this.activeGame);
		this.stimuliJson = "";
		if(this.activeGame ==="Russian"){
			this.stimuliJson ="./../json/audio_stimuli_russian.json";
		}else if(false){
			//TODO
		}else if(false){
			//TODO
		}
		$(function(){
		 	loadSamples( this.stimuliJson, this.startGame() );
		});
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


