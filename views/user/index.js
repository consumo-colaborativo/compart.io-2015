'use strict'; 
/* ********************************************************************** */ 
// Author: Álvaro Saco
// Date: 20-05-2015
// URL: USER
// Description: USER shows an user profile. 
// The user is searched by ID. Routes:
// '/user/:id'
// Test Examples: "/user/54f9e6fc0b0156d5b29468a7"
/* ********************************************************************** */ 

var renderSettings = function(req, res) {
// Input Parameters
if (req.params.id != null){
	var outcome = {};
	var async = require('async');	
	var user_id = req.params.id;			
	
	// Find an user by ID
	async.series([
	// 1- User DOC
	function(callback) {
		if(user_id != null){
			req.app.db.models.User.findById(user_id).exec(function(err, doc) {
		    if (err) 
		    { // On a successful response, the ‘err’ argument is null
		        callback(err, null); // Call the callback with an actual error object
		        // Data can still be returned in the other arguments as well, 
		        // generally the error is passed alone
		    }

		    outcome.user = doc;
		    
		    if (doc == null)
		    	callback(err, null);		    	
		    
		    callback();
	    	});
		}
	}
	],
	function(err) {
	    if (err) {
	    	return err;
	    }
	    console.log(" TEST: user/index " + JSON.stringify(outcome));
		res.render('user/index', {result: outcome});
  	});
	} // end if :id exist
};	
// 
exports.init = function(req, res, next){
	renderSettings(req, res);
};
