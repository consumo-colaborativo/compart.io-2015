'use strict';

exports.init = function(req, res){

  var compartio = req.app.db.model('Compartio');
  var conditions = compartio.schema.paths.condition.enumValues;

  //var categorias = listarCategorias();
  var categorias = ["Una", "Dos"];

  console.log(conditions);
  
  res.render('give/add/index' , { conditions: conditions, categorias: categorias });
};

exports.prueba = function(req, res, next){
  console.log(req.body);
  console.log(req.files);

  res.render('give/add/index');
};

exports.create = function(req, res){

  var workflow = req.app.utility.workflow(req, res);

  workflow.mockpartio = {
                          //"_id" : ObjectId("54d5001e5b12230c694c50cc"),
                          "title" : "Guitarra eléctrica para hacer tapping",
                          "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean purus dolor, tempor ac finibus in, consequat quis enim.",
                          "is_donation" : true,
                          "url_image" : "",
                          "city_id" : "",
                          "category_id" : "",
                          "giver_user_id" : "",
                          "receiver_user_id" : "",
                          "interested_users_id" : "",
                          "status" : "published",
                          "condition" : "used"
                        };

    workflow.on('validate', function() {

      if (!req.body['compartio.nombre']) {
        workflow.outcome.errors.push('por favor, ponle un nombre.');
        return workflow.emit('response');
      }
      if (!req.body['compartio.city']) {
        workflow.outcome.errors.push('el compartio debe tener una ciudad.');
        return workflow.emit('response');
      }
        return workflow.emit('response');

    workflow.emit('createCompartio');
    });

    workflow.on('createCompartio', function(){

      // Esto ahora lo dejamos así puesto que no recibimos nada por post
      fieldsToSet = {
                          //"_id" : ObjectId("54d5001e5b12230c694c50cc"),
                          "title" : "Guitarra eléctrica para hacer tapping",
                          "description" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean purus dolor, tempor ac finibus in, consequat quis enim.",
                          "is_donation" : true,
                          "url_image" : "",
                          "city_id" : "",
                          "category_id" : "",
                          "giver_user_id" : "",
                          "receiver_user_id" : "",
                          "interested_users_id" : "",
                          "status" : "published",
                          "condition" : "used"
                        };

      req.app.db.models.Compartio.create(fieldsToSet, function(err, compartio) {
      if (err) {
        return workflow.emit('exception', err);
      }

      workflow.outcome.record = compartio;
      return workflow.emit('response');
      });
    })

}
