'use strict';
// Home View
exports.init = function(req, res, next){

  var _ = require('lodash');
  var cities=[];
  var compartio;

  // El objetivo de esta consulta es sacar las ciudades donde hay compartios para pasarsela a la plantilla
  req.app.db.models.Compartio.find({ status:'published' })
    .populate('city_id')
    .exec(function (err, compartios) {
      if (err) return console.log('caca');

      for (compartio in compartios) {
        cities[cities.length] = compartios[compartio].city_id.name;
      }
      res.render('home/index', {ciudades: _.uniq(cities, true)});
      })
};