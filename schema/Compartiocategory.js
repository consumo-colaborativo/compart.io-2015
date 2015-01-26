'use strict'; // COMPARTIO SCHEMA
// compartio-category.js
exports = module.exports = function(app, mongoose) {
	var ObjectId = mongoose.Schema.Types.ObjectId;
	//                            
	// define the schema for our MESSAGE model
	var categorySchema = new mongoose.Schema({
	    title:        { type: String, default: '' },
	    description:  { type: String, default: '' },
	    url_imagen:   { type: String, default: '' }
	}); // end categorySchema
	app.db.model('Compartio-Category', categorySchema);
};