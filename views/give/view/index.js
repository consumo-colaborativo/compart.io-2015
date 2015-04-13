'use strict';
/* ********************************************************************** */ 
// Author: Magda Sánchez
// Date: 26-01-2015
// URL: GIVE/VIEW
// Description: GIVE/VIEW shows a compartio that someone wants to "GIVE". 
// The compartio is searched by its ID. Routes:
// '/give/view/:id'
// '/need/view/:id'
// References:
// - https://github.com/caolan/async
//  - http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/
/* ********************************************************************** */ 
var renderSettings = function(req, res) {
// Input Parameters
if (req.params.id != null){
	var outcome = {};
	var async = require('async');
	var compartio_id = req.params.id;			
	/* SUSTITUIR */
	/*  
		title, description, slug, is_donation,url_image, created,updated,
	    city_id,category_id, giver_user_id, receiver_user_id ,
	    interested_users_id, status, condition
  	*/
	// Find a compartio by ID
	async.series([
	// Compartio DOC
	function(callback) {
		req.app.db.models.Compartio.findById(compartio_id).exec(function(err, doc) {
		    if (err) { // On a successful response, the ‘err’ argument is null
		        callback(err, null); // Call the callback with an actual error object
		        // Data can still be returned in the other arguments as well, 
		        // generally the error is passed alone
		    }
		    outcome.compartio = doc;
		    callback();
	    });
	},
	// User DOC
	function(callback) {
		//  outcome.compartio.giver_user_id
		req.app.db.models.User.findById(outcome.compartio.giver_user_id).exec(function(err, user) {
		    if (err) {
		        callback(err, null);
		    }
	    	outcome.user = user;
	    	if (outcome.compartio.interested_users_id != null){
		    	var count = outcome.compartio.interested_users_id.length;
		    	outcome.interested_users = [];
		    	// array of interested users in the compartio
		    	for (var index = 0; index < count; index++) {
		    		//console.log("userid " + outcome.compartio.interested_users_id[index]);
	    			req.app.db.models.User.findById(outcome.compartio.interested_users_id[index]).exec(function(err, doc) {
	    				if (err) {
					        callback(err, null);
					    }
				    	outcome.interested_users.push(doc);
	    			});
		    	} // end each interested user
			}
			callback();
		});
	},
	// Category DOC
	function(callback) {
		//  Outcome.compartio.category_id
		req.app.db.models.CompartioCategory.findById(outcome.compartio.category_id).exec(function(err, cat) {
		    if (err) {
		        callback(err, null);
		    }
	    	outcome.category = cat;
			callback();
		});
	},
	// City DOC
	function(callback) {
		//  Outcome.compartio.category_id
		req.app.db.models.City.findById(outcome.compartio.city_id).exec(function(err, cat) {
		    if (err) {
		        callback(err, null);
		    }
	    	outcome.city = cat;
			callback();
		});
	},
	// Message DOC
	function(callback) {
		//  outcome.compartio.category_id
		req.app.db.models.Message.find({compartio_id: compartio_id} ).exec(function(err, cat) {
		    if (err) {
		        callback(err, null);
		    }
	    	outcome.message = cat;
			callback();
		});
	},
	// User of Message DOC
	function(callback) {
		if ( outcome.message != null){
			var message_users = [];
			var count = outcome.message.length;
		    	// array of interested users in the compartio
		    	for (var index = 0; index < count; index++) {
		    		console.log("userid mess " + outcome.message[index].user_id);
		    		req.app.db.models.User.findById(outcome.message[index].user_id).exec(function(err, doc) {
	    				if (err) {
					        callback(err, null);
					    }
					    //ME QUEDO AQUI, NO FUNCIONA BIEN!
				    	message_users.push(doc);
	    			});
		    	} // end each interested user
		    	console.log(JSON.stringify(message_users));
		    	outcome.messageuser = message_users;
			}
		callback();
	},
	], 
	function(err) {
	    if (err) {
	    	return err;
	    }
	    console.log(" TEST: give/view/index " + JSON.stringify(outcome));
		res.render('give/view/index', {result: outcome});
  	});
} // end if :id exist
};	
// 
exports.init = function(req, res, next){
	renderSettings(req, res);
};
