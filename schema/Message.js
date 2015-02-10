'use strict'; // COMPARTIO SCHEMA
// message.js
exports = module.exports = function(app, mongoose) {
	//                            
	// define the schema for our MESSAGE model
	var messageSchema = new mongoose.Schema({
	    compartio_id:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Compartio' }],
	    user_id:        [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	    date_time:  	{ type: Date, default: Date.now },
	    content:        { type: String, default: '' },
	    url_image: 	    { type: String, default: '' }
	}); // end messageSchema
	app.db.model('Message', messageSchema);
};