//'use strict';
// Home View
exports.init = function(req, res, next){

  var _ = require('lodash');

  // El objetivo de esta consulta es sacar las ciudades donde hay compartios para pasarsela a la plantilla
  req.app.db.models.Compartio.find({ status:'published' })
    .populate('city_id')
    .exec(function (err, compartios) {
      if (err) return console.log('caca');
      var cities=[];
      for (compartio in compartios) {
        cities[cities.length] = compartios[compartio].city_id.name;
      }
      // hacer falta una función para quitar duplicados en cities, lodash?
      res.render('home/index', {ciudades: _.uniq(cities, true)});
      })
};