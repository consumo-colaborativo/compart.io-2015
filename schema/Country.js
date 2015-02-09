'use strict'; // COMPARTIO SCHEMA
// country.js
// load the countries
//
exports = module.exports = function(app, mongoose) {
	// define the schema for our country model
	var countrySchema = new mongoose.Schema({
		name					: { type: String, required: true},
		isActive         		: { type: Boolean}, 
		activation_date	  		: { type: Date },
		creation_date	  		: { type: Date, default: Date.now }
	});

	// create the model "Country" for countries and expose it to our app
	app.db.model('Country', countrySchema);
};
