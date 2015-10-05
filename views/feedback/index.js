'use strict';


exports.init = function(req, res){
  res.render('feedback/index', { title: "Contacto"});
};


exports.test = function(req, res){
  console.log('POST');
}

// POST - Insert a new feedback in the DB
exports.addFeedback = function(req, res){
  console.log('POST');
  console.log(req.body);
  //console.log(req.app.db);
  console.log("req.csrfToken(): " + req.csrfToken());
  //console.log("req.csrftoken: " + req.csrftoken);
  //console.log("Session: " + req.session);

  
  // Set our internal DB variable
  var db = req.app.db;

  // Get our form values. These rely on the "name" attributes
  var asunto = req.body.subject;
  var mensaje = req.body.message;
  var email = req.body.email;

  // Set our collection
  //var collection = db.get('feedbacks');

  // Submit to the DB
  var feedback = req.app.db.model('Feedback');

  //req.app.db.Models.Feedback.create({
  feedback.create({
        //"username" : userName,
        //"subject" : asunto,
        "message" : mensaje,
        "email" : email
        // add created date        
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
            console.log(err);
        }
        else {
            // And forward to success page
            //res.redirect("feedback/index", { mensaje: "Gracias por tu mensaje"} );
            res.render("feedback/index", { mensaje: "Gracias por tu mensaje"} );
        }
    });  
};



exports.sendMessage = function(req, res){  

  var workflow = req.app.utility.workflow(req, res);

  console.log("sendMessage");

  workflow.on('validate', function() {
/*
    if (!req.body.name) {
      workflow.outcome.errfor.name = 'required';
    }

    if (!req.body.email) {
      workflow.outcome.errfor.email = 'required';
    }

    if (!req.body.message) {
      workflow.outcome.errfor.message = 'required';
    }

    if (workflow.hasErrors()) {
      return workflow.emit('response');
    }
*/
    workflow.emit('sendEmail');
  });

  workflow.on('sendEmail', function() {

    console.log("sendEmail");

    /*
    req.app.utility.sendmail(req, res, {
      from: req.app.config.smtp.from.name +' <'+ req.app.config.smtp.from.address +'>',
      replyTo: req.body.email,
      to: req.app.config.systemEmail,
      subject: req.app.config.projectName +' contact form',
      textPath: 'contact/email-text',
      htmlPath: 'contact/email-html',
      locals: {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        projectName: req.app.config.projectName
      },
      success: function(message) {
        workflow.emit('response');
      },
      error: function(err) {
        workflow.outcome.errors.push('Error Sending: '+ err);
        workflow.emit('response');
      }
    });
*/
  
  });

  workflow.emit('validate');
};
