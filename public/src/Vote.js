var Vote = Backbone.Model.extend({
	defaults: {
		
	}
});




var Vote = function(){
 /*
	member vars
  */
};
/*
 * CRUD methods for the Vote module
 */
Vote.prototype.create = function(userId, stimuliId, reactionTime, voteValue, callback){
	debug("Inserting new vote.");
	var vote = {};
	vote.timestamp = Date.now();
	vote.userId = userId;
	vote.stimuliId = stimuliId;
	vote.reactionTime = reactionTime;
	vote.value = voteValue;
	SyncResultTable.queueResultForSync(vote, sucessCallback(), failureCallback());
	if(typeof callback === 'function'){
		callback();
	}
};
/*
 * Calls back with the vote's info
 */
Vote.prototype.read = function(callback){
	debug("Reading vote.");
	var theVote = "";
	if(typeof callback === 'function'){
		callback(theVote);
	}
};


		
/* Update should not be called */
Vote.prototype.update = function(newInfo, callback){
	debug("Update is not defined on vote objects.");
	if(typeof callback === 'function'){
		callback();
	}
};
/* Delete does not delete the vote, rather it flags it as deleted */
Vote.prototype.del = function(callback){
	debug("Flagging vote as deleted");
	if(typeof callback === 'function'){
		callback();
	}
};
vote = function(event, callback){
	if(event.target){
		debug("User voted: "+event.target.value);
	}else{
		debug("User voted: "+event);
	}
	playAudio(event);
	if(typeof callback === 'function'){
		callback();
	}
};
