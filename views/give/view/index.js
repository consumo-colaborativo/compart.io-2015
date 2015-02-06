'use strict';
/* ********************************************************************** */ 
// Author: Magda Sánchez
// Date: 26-01-2015
// URL: GIVE/VIEW
// Description: GIVE/VIEW shows a compartio that someone wants to "GIVE". 
// The compartio is searched by its ID.
/* ********************************************************************** */ 
var renderSettings = function(req, res, next) {
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
		var id = "54d5001e5b12230c694c5035";
		req.app.db.models.Compartio.findById(id).exec(function(err, doc) {
		    if (err) {
		        callback(err, null);
		    }
		    outcome.compartio = doc;
		    console.log("user: "+doc.giver_user_id);
		    return callback(getUserData, 'done');
	    });
	}; // end getCompartioData
	var getUserData = function(callback) {
		req.app.db.models.User.findById(outcome.compartio.giver_user_id).exec(function(err, user) {
		    if (err) {
		        callback(err, null);
		    }
	    	outcome.user = user;
		});
		return callback(null, 'done');
	}; 
	/*
	var getCityData = function(callback) {
	
	}; // end getCityData
	var getCategoryData = function(callback) {

	}; // end getCategoryData
	var getMessageData = function(callback) {
		

	}; // end getMessageData
	*/
	var asyncFinally = function(err, results) {
	    if (err) {
	    	return next(err);
	    }
	    console.log("TEST compartio: " + JSON.stringify(outcome.compartio));
	    console.log("TEST user: " +  JSON.stringify(outcome.user));
		/*res.render('give/view/index', {
			      data: {	compartio: escape(JSON.stringify(outcome.compartio))	}
		});*/
  	};
  	require('async').parallel([getCompartioData], asyncFinally);
};	
// 
exports.init = function(req, res, next){
	console.log("give-view");
	renderSettings(req, res, next);
};
