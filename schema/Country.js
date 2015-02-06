'use strict'; // COMPARTIO SCHEMA
// country.js
// load the countries
//
exports = module.exports = function(app, mongoose) {
	// define the schema for our country model
	var countrySchema = new mongoose.Schema({
		country_short_name		: { type: String},
		country_long_name		: { type: String},
		country_numcode			: { type: Number},
		country_spanish_name	: { type: String, required: true},
		isActive         		: { type: Boolean}, 
		activation_date	  		: { type: Date },
		creation_date	  		: { type: Date, default: Date.now }
	});
	countrySchema.plugin(require('./plugins/pagedFind'));
	countrySchema.set('autoIndex', (app.get('env') === 'development'));
	// create the model "Country" for countries and expose it to our app
	app.db.model('Country', countrySchema);
};
