var Participant = function(){
	/*
	 * Variables gathered from browser on participant creation, used as indirect
	 * measures of the participant's native language(s) and other factors that need
	 * to be controlled for.
	 */
	this.systemLocale = "";
	this.userAgentString = "";
	this.timezone = "";
	this.ipaddress = "";
	this.startTime = "";
	this.exitTime = "";
	this.sessionId = "";
	/*
	 * Variables gathered during the exit survey if the participant wants to 
	 * participate.
	 */
	this.surveyResults = [];
	/*
	 * Variables used if the participant wants to register for extra credit.
	 */
	this.email = "";
};

Participant.prototype.create = function(callback){
	debug("Inserting new participant.");
	if(typeof callback === 'function'){
		callback();
	}
};
Participant.prototype.read = function(callback){
	debug("Reading participant.");
	if(typeof callback === 'function'){
		callback();
	}
};
Participant.prototype.update = function(newInfo, callback){
	debug("Updating participant.");
	if(typeof callback === 'function'){
		callback();
	}
};
Participant.prototype.del = function(callback){
	debug("Deleting participant");
	if(typeof callback === 'function'){
		callback();
	}
};

surveyClick = function(event, callback){
	debug("User clicked a survey button: "+event.target.value);
	debug("The category was: "+event.target.parentNode.id);
	if(typeof callback === 'function'){
		callback();
	}
};