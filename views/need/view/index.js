'use strict';
/* ********************************************************************** */ 
// Author: Magda Sánchez
// Date: 09-02-2015
// URL: NEED/VIEW
// Description: NEED/VIEW shows a compartio that someone NEEDS. 
// The compartio is searched by its ID.
// "/need/view/54d5001e5b12230c694c5036" 
// References:
//	- https://github.com/caolan/async
/* ********************************************************************** */ 
var renderSettings = function(req, res, next) {
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
	// 1- Compartio DOC
	function(callback) {
		if(compartio_id != null){
		req.app.db.models.Compartio.findById(compartio_id).exec(function(err, doc) {
		    if (err) { // On a successful response, the ‘err’ argument is null
		        callback(err, null); // Call the callback with an actual error object
		        // Data can still be returned in the other arguments as well, 
		        // generally the error is passed alone
		    }
		    outcome.compartio = doc;
		    if (doc == null){
		    	callback(err, null);		    	
		    }else{
		    	if(doc.is_donation == true ){ //Looking for REQUESTS
		    		callback(err, null);
		    	}
		    }
		    callback();
	    });
		}
	},
	// 3- Category DOC
	function(callback) {
		//  Outcome.compartio.category_id
		if(outcome.compartio != null){
		if( outcome.compartio.category_id != null){
			req.app.db.models.CompartioCategory.findById(outcome.compartio.category_id).exec(function(err, cat) {
			    if (err) {
			        callback(err, null);
			    }
		    	outcome.category = cat;
				callback();
			});
		}
		}else{
			callback(0,null); // PENDIENTE: define error number
		}
	},
	// 4- City DOC
	function(callback) {
		//  Outcome.compartio.category_id
		if( outcome.compartio != null){
			req.app.db.models.City.findById(outcome.compartio.city_id).exec(function(err, cat) {
			    if (err) {
			        callback(err, null);
			    }
		    	outcome.city = cat;
				callback();
			});
		}
	},
	// 5- Message DOC
	function(callback) {
		//  outcome.compartio.category_id
		if( compartio_id != null){
			req.app.db.models.Message.find({compartio_id: compartio_id} ).exec(function(err, cat) {
			    if (err) {
			        callback(err, null);
			    }
		    	outcome.message = cat;
				callback();
			});
		}
	},
	// 2- User DOC
	function(callback) {
		//  outcome.compartio.receiver_user_id
		var search = "[";
		if ( outcome.message != null){
			var count = outcome.message.length;
		    	// array of interested users in the compartio
		    	for (var index = 0; index < count; index++) {
		    		if( index == 0){
			    		search = search + "{ _id: '"+outcome.message[index].user_id+"'}";
					}else{
						search = search + ",{ _id: '"+outcome.message[index].user_id+"'}";
					}
		    	} // end each interested user
		    search = search + ",{ _id: '"+outcome.compartio.receiver_user_id+"'}";
		}else{
			search = search + "{ _id: '"+outcome.compartio.receiver_user_id+"'}";
		}
		search = search + "]";
		req.app.db.models.User.find( { $or: eval(search)})
			.exec(function(err, user) {
		    if (err) {
		        callback(err, null);
		    }
	    	outcome.user = user;
			callback();
		});
	}, // Interested users
	function(callback) {
		var search = "[";
		if (outcome.compartio.interested_users_id != null){
		    	var count = outcome.compartio.interested_users_id.length;
		    	outcome.interested_users = [];
		    	// array of interested users in the compartio
		    	for (var index = 0; index < count; index++) {
		    		if( index == 0){
			    		search = search + "{ _id: '"+outcome.compartio.interested_users_id[index]+"'}";
					}else{
						search = search + ",{ _id: '"+outcome.compartio.interested_users_id[index]+"'}";
					}
		    	} // end each interested user
				search = search + "]";
		    	// Array of interested users in the compartio
	    		req.app.db.models.User.find({ $or: eval(search)})
    				.exec(function(err, doc) {
    				if (err) {
				        callback(err, null);
				    }
			    	outcome.interested_users = doc;
			    	callback();
    			});
			}
	}
	], 
	function(err) {
	    if (err) {
	    	// The reason next is exposed and must be explicitly 
	    	// called is for middleware, which performs I/O or 
	    	// async operations. Express.js has no way of knowing 
	    	// when your operation is complete before it can 
	    	// continue to the next middleware or route.
	    	return next(err); // pass control to the next handler
	    }else{
	    	console.log(outcome);
			res.render('need/view/index', {result: outcome});
	  	}
  	});
} // end if :id exist
};	
// 
exports.init = function(req, res, next){
	renderSettings(req, res, next);
};