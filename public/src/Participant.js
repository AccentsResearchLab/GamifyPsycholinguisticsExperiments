var ParticipantModel = Backbone.Model.extend({
	initialize: function(){
		debug("Welcome new participant.");
		/*
		 * Variables gathered from browser on participant creation, used as indirect
		 * measures of the participant's native language(s) and other factors that need
		 * to be controlled for.
		 */
		this.systemLocale = '';
		this.browser = '';
		this.timezone = '';
		this.ipaddress = '';
		this.startTime = '';
		this.exitTime = '';
		this.sessionId = Date.now();
		this.surveyResults = [];
		this.votes = [];

		this.bind("change:votes", function(){
			debug(this.attributes);
		})
	},
	validate: function( attributes ){
		debug("validating");
	},
	vote: function( value ){
		debug("vote was called by "+this.get("sessionId"));
	}
});


surveyClick = function(event, callback){
	debug("User clicked a survey button: "+event.target.value);
	debug("The category was: "+event.target.parentNode.id);
	if(typeof callback === 'function'){
		callback();
	}
};