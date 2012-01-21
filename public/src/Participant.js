var Participant = Backbone.Model.extend({
	defaults: {
	/*
	 * Variables gathered from browser on participant creation, used as indirect
	 * measures of the participant's native language(s) and other factors that need
	 * to be controlled for.
	 */
		systemLocale : '',
		browser : '',
		timezone : '',
		ipaddress : '',
		startTime : '',
		exitTime : '',
		sessionId : '',
		surveyResults : [],
		votes : []
	},
	initialize: function(){
		debug("Welcome new participant.");
		this.bind("change:votes", function(){
			debug(this.attributes);
		})
	},
	validate: function( attributes ){
		debug("validating");
	},
	vote: function( value ){
		var votes_array = this.get("votes");
		votes_array.push( value );
		this.set({ votes: votes_array });
	}
});


surveyClick = function(event, callback){
	debug("User clicked a survey button: "+event.target.value);
	debug("The category was: "+event.target.parentNode.id);
	if(typeof callback === 'function'){
		callback();
	}
};