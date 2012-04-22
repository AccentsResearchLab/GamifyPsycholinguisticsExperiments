
var GameRouter = Backbone.Router.extend({
	initialize: function(){
		
		this.participant = new ParticipantModel();
		this.scores = [];
		this.scores[0] = [
			{name: "Not", values: [0, 0 ]},
   			{name: "Native", values: [0, 0]},
    		{name: "Pre", values: [0, 0]}
    		];
    	this.currentBlock=0;
    	this.countAudioInSet =0;
		this.activeGame = localStorage.getItem("gameLanguage") 
		
		if( ! this.activeGame){
		// alert("Game language is not set, please click on a language.");
		// window.location="soundcheck.html";
		}
		this.stimuliJson = window.games[this.activeGame].stimuliJson;
		window.game = this;
		loadSamples( this.stimuliJson, startGame() );

	
	},
	routes: {
		"": "startGame"
	},
	
});


var startGame = function(){
	debug("Starting game.");
	document.getElementById("spytype").innerHTML=window.games[window.game.activeGame].adjective +" ";
	if(document.getElementById("spytype2")){
		document.getElementById("spytype2").innerHTML=window.games[window.game.activeGame].language +" ";
	}
	if(document.getElementById("spytype3")){
		document.getElementById("spytype3").innerHTML=window.games[window.game.activeGame].language +" ";
	}
	debug("Game language is set to "+window.games[window.game.activeGame].language);
		
	draw_counter(window.game.countAudioInSet);
	var visitor = localStorage.getItem("visitor");
	if(visitor){
		visitor = JSON.parse(visitor);
		window.game.participant.sessionId = visitor.visitorid;
	}
	
};