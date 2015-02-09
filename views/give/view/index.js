'use strict';
/* ********************************************************************** */ 
// Author: Magda Sánchez
// Date: 26-01-2015
// URL: GIVE/VIEW
// Description: GIVE/VIEW shows a compartio that someone wants to "GIVE". 
// The compartio is searched by its ID.
// References:
//	- https://github.com/caolan/async
/* ********************************************************************** */ 
var renderSettings = function(req, res) {
	var outcome = {};
	var async = require('async');
	var compartio_id = "54d5001e5b12230c694c5035";	
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
	async.series([
	// compartio DOC
	function(callback) {
		req.app.db.models.Compartio.findById(compartio_id).exec(function(err, doc) {
		    if (err) {
		        callback(err, null);
		    }
		    outcome.compartio = doc;
		    callback();
	    });
	},
	// user DOC
	function(callback) {
		//  outcome.compartio.giver_user_id
		req.app.db.models.User.findById( outcome.compartio.giver_user_id ).exec(function(err, user) {
		    if (err) {
		        callback(err, null);
		    }
	    	outcome.user = user;
			callback();
		});
	},
	// category DOC
	function(callback) {
		//  outcome.compartio.category_id
		req.app.db.models.CompartioCategory.findById( outcome.compartio.category_id ).exec(function(err, cat) {
		    if (err) {
		        callback(err, null);
		    }
	    	outcome.category = cat;
			callback();
		});
	},
	// city DOC
	function(callback) {
		//  outcome.compartio.category_id
		req.app.db.models.City.findById( outcome.compartio.city_id ).exec(function(err, cat) {
		    if (err) {
		        callback(err, null);
		    }
	    	outcome.city = cat;
			callback();
		});
	},
	// message DOC
	function(callback) {
		//  outcome.compartio.category_id
		req.app.db.models.Message.findById( compartio_id ).exec(function(err, cat) {
		    if (err) {
		        callback(err, null);
		    }
	    	outcome.message = cat;
			callback();
		});
	},
	], 
	function(err) {
	    if (err) {
	    	return next(err);
	    }
	    console.log(" TEST: " + JSON.stringify(outcome));
		res.render('give/view/index', {
			      data: {	compartio: escape(JSON.stringify(outcome.compartio))	}
		});	
  	});
};	
// 
exports.init = function(req, res, next){
	renderSettings(req, res);
};
