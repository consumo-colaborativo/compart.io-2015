'use strict'; 
/* ********************************************************************** */ 
// Author: Álvaro Saco
// Date: 20-05-2015
// URL: USER
// Description: USER shows an user profile. 
// The user is searched by ID. Routes:
// '/user/:id'
// Test Examples:
// 		"/user/54f9e6fc0b0156d5b29468a7"
// 		"/user/54d503445b12230c694c503a"
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
	},

	// 2- City DOC
	function(callback) {		
		if( outcome.user.city != null){
			req.app.db.models.City.findById(outcome.user.city).exec(function(err, city) {
			    if (err) {
			        callback(err, null);
			    }
		    	outcome.city = city;
				callback();
			});
		}
	},

	// 3- Compartio DOC
	function(callback) {		
		// Lo que ofrece ahora:
		// Buscar compartios cuyo giver_user_id == user_id && status == published
		//var search = "[";
		
		outcome.compartios = [];

		//var query = '{giver_user_id: "' + user_id + '"}, { status: "published" }';
		var query = '{ giver_user_id: ObjectId("' + user_id + '")}, { status: "published" }';
		console.log(query);

		//req.app.db.models.Compartio.find({_giver_user_id: user_id} )		
		//req.app.db.models.Compartio.find( { $and: [query] } )
		req.app.db.models.Compartio.find( 
			{ 
				giver_user_id: user_id,
				status: "published"
      		})
			.exec(function(err, compartios) {
			if (err) {
				callback(err, null);
			}
			else if (compartios.length) {
			    //console.log('Found:', compartios);
			} else {
			    console.log('No document(s) found with defined "find" criteria!');
			}
		    outcome.donations = compartios;
			callback();
		});		

	}
	
	// Lo que pide o busca ahora mismo:
	// Buscar compartios cuyo giver_user_id == "" && status == published && receiver_user_id == user_id && is_donation == false

	],
	function(err) {
	    if (err) {
	    	return err;
	    }
	    //console.log(" TEST: user/index " + JSON.stringify(outcome));
		res.render('user/index', {result: outcome});
  	});
	} // end if :id exist
};	
// 
exports.init = function(req, res, next){
	renderSettings(req, res);
};
