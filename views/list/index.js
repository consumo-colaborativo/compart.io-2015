'use strict'; 
// Home View
// List of Compartios filter by different values -- MAGDA --
// - /:city_slug/
// - /:city_slug/give/
// - /:city_slug/give/:category  f.e. /cordoba/gives/bicicletas-y-patinetes
// - /:city_slug/give/search/:word
// - /:city_slug/give/:category/search/:word
// - /:city_slug/need/
// - /:city_slug/need/:category
// - /:city_slug/need/search/:word
// - /:city_slug/need/:category/search/:word
//  http://mongoosejs.com/docs/2.7.x/docs/query.html
var renderSettings = function(req, res, next) {
// Input Parameters
if (req.params.city_slug != null){
	var city_slug = req.params.city_slug;
	var category_slug = req.params.category_slug;
	var word = req.params.word; // title and description
	var search = req.params.search;	
	var urls = req.url.split('/');
	var listType = null;
	if(urls.length >= 3){
		listType = urls[2];
	}
	//
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
	// Category DOC
	function(callback) {
		req.app.db.models.CompartioCategory.findOne({ slug: category_slug }).exec(function(err, doc) {
		    if (err) {
		        callback(err, null);
		    }
		    outcome.category = doc;
		    callback();
	    });
	},
	// Compartio DOC
	function(callback) { 
		var cat,city;
		cat = "[{status: 'published'}"; //,
	    if (outcome.category != null){
	    	cat = cat + ",{category_id: '"+outcome.category._id+"'}";
	    }
	    if (outcome.city != null){
	    	cat = cat + ",{city_id: '"+ outcome.city._id+"'}";
	    }
	    if (listType != null){
	    	if(listType == 'give'){
	    		cat = cat + ",{receiver_user_id: null}";
	    	}else{
	    		if(listType == 'need'){ 
	    			cat = cat + ",{giver_user_id: null}";
	    		}
	    	}
	    }
	    cat = cat + "]";
	   // hay que tratarlo como una cadena de JSON
	  	req.app.db.models.Compartio.find( { $and: eval(cat)})
			.limit(50)
			.exec(function(err, doc) {
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
	    	return next(err); // Qué significa NEXT?
	    }
	    console.log(" compartio: " + JSON.stringify(outcome.compartio[0]));
	    res.render('list/index', {result: outcome});
  	});
} // end if :city_slug exist
};
// 
exports.init = function(req, res, next){
	renderSettings(req, res, next);
};