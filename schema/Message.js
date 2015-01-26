'use strict'; // COMPARTIO SCHEMA
// message.js
exports = module.exports = function(app, mongoose) {
	//                            
	// define the schema for our MESSAGE model
	var messageSchema = new mongoose.Schema({
	    compartio_id:   [{ ObjectId, ref: 'Compartio' }],
	    user_id:        [{ ObjectId, ref: 'Compartio-user' }],
	    date_time:     { type: Date, default: Date.now },
	    content:        { type: String, default: '' },
	    url_imagen:     { type: String, default: '' }
	}); // end messageSchema

	app.db.model('Message', messageSchema);
};