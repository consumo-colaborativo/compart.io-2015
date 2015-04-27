'use strict'; 

// feedback.js
exports = module.exports = function(app, mongoose) {
	var feedback_subjects = [
		"Algo no funciona",
		"Uso inadecuado de compart.io",
		"Tengo una sugerencia/idea",
		"Sobre la plataforma",
		"¡Quiero ayudar!",
		"Comentarios generales"
	];
	                            
	// define the schema for our MESSAGE / FEEDBACK model
	var feedbackSchema = mongoose.Schema({
	    name:      { type: String, default: '' },
	    email:     { type: String, default: '' },
	    message:   { type: String, default: '' },
	    subject  : { type: String, enum: feedback_subjects}
	}); // end categorySchema
	feedbackSchema.plugin(require('./plugins/pagedFind'));
	feedbackSchema.set('autoIndex', (app.get('env') === 'development'));	
	app.db.model('Feedback', feedbackSchema);

	var Temp = mongoose.model('Feedback', feedbackSchema);
 	app.enumFeedbacks = Temp.schema.path('subject').enumValues;

	// console.log(app.enumFeedbacks);	
};


