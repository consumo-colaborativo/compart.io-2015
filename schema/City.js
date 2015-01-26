'use strict'; // COMPARTIO SCHEMA
// City.js
// load the cities we need
//
exports = module.exports = function(app, mongoose) {
// define the schema for our city model
  var citySchema = new mongoose.Schema({
    name          : { type: String, required: true},  
    postal_code   : { type: Number},
    slug          : { type: String},
    isActive      : { type: Boolean, default: false}, 
    created       : { type: Date, default: Date.now },
    updated       : { type: Date },
    Country       : { type: mongoose.Schema.Types.ObjectId, ref: 'Country'}
  });
  app.db.model('City', citySchema);
};
