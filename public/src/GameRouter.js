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
	initialize: function(){
		this.participant = new ParticipantModel();
	},
	routes: {
		"": "startGame"
	},
	startGame: function(){
		var el = new GameView().render();
		$("#gamearea_div").html(el);
	}
});

$(function(){
	window.gameRouter = new GameRouter();
	Backbone.history.start();
});

/*
There are three games, Russian, Sussex, South African
*/
GameRouter.games = ["Russian","Sussex","South African"];
GameRouter.activeGame = ["Russian"];
