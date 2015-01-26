'use strict';
//
// Author: Magda Sánchez
// Date: 26-01-2015
//
var renderSettings = function(req, res) {
	var outcome = {};
	// Documents Needed for consult: Compartio,
	/*
	title         : { type: String, required: true},  
    description	  : { type: String, required: true},
    slug          : { type: String, lowercase: true},
    is_donation	  : { type: Boolean, required: true},
    url_image     : { type: String },
    created       : { type: Date, default: Date.now },
    updated       : { type: Date },
    city_id     	: { type: mongoose.Schema.Types.ObjectId, ref: 'City'},
    category_id	  : { type: mongoose.Schema.Types.ObjectId, ref: 'Compartio-category'},
    giver_user_id	: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiver_user_id	: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    interested_users_id : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    status        : { type: String,
            					required: true,  					
            					enum: status,
            					default: 'published'},
    condition     : { type: String,
    					        enum: condition},
  	*/
	// Find a compartio by ID
	var getCompartioData = function(callback) {
		req.app.db.models.Compartio.findById(req.compartio.id, 'title description city_id category_id giver_user_id interested_users_id status condition').exec(function(err, compartio) {
	    if (err) {
	        callback(err, null);
	    }
	    outcome.compartio = compartio;
	    return callback(null, 'done');
	    });
	};
	var getUserData = function(callback) {
	
	};
	var getCityData = function(callback) {
	
	};
	var getCategoryData = function(callback) {

	};
	var getMessageData = function(callback) {
		

	};
	var asyncFinally = function(err, results) {
	    if (err) {
	      return next(err);
	    }
	    console.log("TEST" + outcome.compartio);
		res.render('give/view/index', {
			      data: {	compartio: escape(JSON.stringify(outcome.compartio))	}
		});
  	};
  	require('async').parallel([getCompartioData, getUserData], asyncFinally);
};	
// 
exports.init = function(req, res){
	console.log("give-view");
	renderSettings(req, res);
};
