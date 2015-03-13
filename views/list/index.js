'use strict';
// Home View
// 
var renderSettings = function(req, res) {
	// Route /:city_slug/
	var city_slug = req.params.city_slug;
	var async = require('async');
	var outcome = {};
	async.series([
	// City DOC
	function(callback) {
		req.app.db.models.City.findOne({ slug: city_slug }).exec(function(err, doc) {
		    if (err) {
		        callback(err, null);
		    }
		    outcome.city = doc;
		    callback();
	    });
	},
	// Compartio DOC
	function(callback) {
		var city_id = outcome.city._id;
		//  outcome.compartio.giver_user_id
		req.app.db.models.Compartio.find({ city_id: city_id, status: 'published'}).exec(function(err, doc) {
		    if (err) {
		        callback(err, null);
		    }
		    outcome.compartio = doc;
		    callback();
	    });
	},
	// Category DOC
	function(callback) {
		var category_id = outcome.compartio.category_id;
		//  outcome.compartio.giver_user_id
		req.app.db.models.CompartioCategory.findById(category_id).exec(function(err, doc) {
		    if (err) {
		        callback(err, null);
		    }
		    console.log(doc);
		    outcome.compartio.category = doc;
		    callback();
	    });
	},
	], 
	function(err) {
	    if (err) {
	    	return next(err);
	    }
	    //console.log(" city: " + JSON.stringify(outcome.city));
	    console.log(" compartio: " + JSON.stringify(outcome.compartio[0]));
	    res.render('list/index', {result: outcome});
  	});
};
// 
exports.init = function(req, res, next){
	renderSettings(req, res);
};