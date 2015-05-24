'use strict'; // COMPARTIO SCHEMA
// Compartio.js
exports = module.exports = function(app, mongoose) {
  var status = ['published', 'canceled', 'delivered'];
  var condition = 'new used broken'.split(' ');
  // define the schema for our city model
  var compartioSchema = new mongoose.Schema({
    title         : { type: String, required: true},  
    description	  : { type: String, required: true},
    slug          : { type: String, lowercase: true},
    is_donation	  : { type: Boolean, required: true},
    url_image     : { type: String },
    created       : { type: Date },
    updated       : { type: Date },
    city_id     	: { type: mongoose.Schema.Types.ObjectId, ref: 'City'},
    category_id	  : { type: mongoose.Schema.Types.ObjectId, ref: 'CompartioCategory'},
    giver_user_id	: { type: mongoose.Schema.Types.ObjectId, default:null, ref: 'User'},
    receiver_user_id	: { type: mongoose.Schema.Types.ObjectId, default:null, ref: 'User'},
    interested_users_id : [{ type: mongoose.Schema.Types.ObjectId, default:null, ref: 'User'}],
    status        : { type: String,
            					required: true,  					
            					enum: status,
            					default: 'published'},
    condition     : { type: String,
    					        enum: condition},
    
  });
  compartioSchema.plugin(require('./plugins/pagedFind'));
  compartioSchema.set('autoIndex', (app.get('env') === 'development'));
  // create the model "Compartio" for objects and expose it to our app
  app.db.model('Compartio', compartioSchema);
};