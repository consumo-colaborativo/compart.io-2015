'use strict';
// Home View
// 
var renderSettings = function(req, res) {
	// Route /:city_slug/
	var city_slug = req.params.city_slug;
	var async = require('async');
	var outcome = {};
	console.log("Inside render"+city_slug);
	async.series([
	// Compartio DOC
	function(callback) {
		req.app.db.models.City.findOne({ slug: city_slug }).exec(function(err, doc) {
		    if (err) {
		        callback(err, null);
		    }
		    outcome.city = doc;
		    callback();
	    });
	},
	// User DOC
	function(callback) {
		var city_id = outcome.city._id;
		//  outcome.compartio.giver_user_id
		req.app.db.models.Compartio.find({ city_id: city_id}).exec(function(err, doc) {
		    if (err) {
		        callback(err, null);
		    }
		    outcome.compartio = doc;
		    callback();
	    });
	},
	], 
	function(err) {
	    if (err) {
	    	return next(err);
	    }
	    console.log(" TEST: " + JSON.stringify(outcome));
	    res.render('list/index', {
    		data: JSON.stringify(outcome.compartio),
		});
  	});
};
// 
exports.init = function(req, res, next){
	renderSettings(req, res);
};