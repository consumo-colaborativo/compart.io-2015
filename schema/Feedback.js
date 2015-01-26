'use strict'; // COMPARTIO SCHEMA
// feedback.js
exports = module.exports = function(app, mongoose) {
	var feedback_subject = ["Categorías para los mensajes (opcional)", "Algo no funciona",
	"Uso inadecuado de compart.io","Tengo una sugerencia/idea", 
	"Sobre la plataforma", "¡Quiero ayudar!", "Comentarios generales"];
	//                            
	// define the schema for our MESSAGE model
	var feedbackSchema = mongoose.Schema({
	    name:      { type: String, default: '' },
	    email:     { type: String, default: '' },
	    message:   { type: String, default: '' },
	    subject  : { type: String, enum: feedback_subject}
	}); // end categorySchema

	app.db.model('Feedback', categorySchema);
};


