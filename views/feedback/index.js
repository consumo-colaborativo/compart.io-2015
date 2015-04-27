'use strict';


exports.init = function(req, res){

  //console.log(req.app.db.models.Feedback.schema.path('feedback_subjects').enumValues);
  //console.log(test.schema.path('feedback_subjects').enumValues);  
  
  res.render('feedback/index');

  //console.log(app.enumFeedback);

};

// POST - Insert a new feedback in the DB
exports.addFeedback = function(req, res){
  //console.log('POST');
  //console.log(req.body);

  var workflow = req.app.utility.workflow(req, res);

  workflow.on('validate', function() {
    if (!req.body.name) {
      workflow.outcome.errfor.name = 'required';
    }
    else if (!/^[a-zA-Z0-9\-\_]+$/.test(req.body.user)) {
      workflow.outcome.errfor.name = 'only use letters, numbers, \'-\', \'_\'';
    }

    if (!req.body.email) {
      workflow.outcome.errfor.email = 'required';
    }
    else if (!/^[a-zA-Z0-9\-\_\.\+]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z0-9\-\_]+$/.test(req.body.email)) {
      workflow.outcome.errfor.email = 'invalid email format';
    }

    if (!req.body.message) {
      workflow.outcome.errfor.message = 'required';
    }

    if (workflow.hasErrors()) {
      return workflow.emit('response');
    }


  workflow.emit('validate');
    
  });

/*
  var feedback = new Feedback({
    name:     req.body.name,
    email:    req.body.email,
    message:  req.body.message,
    subject:  req.body.subject,  
  });

  feedback.save(function(err, feedback){
    if(err) 
      return res.send(500, err.message);
    res.status(200).jsonp(feedback);
    console.log("A new feedback saved!");
    });

  res.send(feedback);
  */

};



exports.sendMessage = function(req, res){  

  var workflow = req.app.utility.workflow(req, res);

  workflow.on('validate', function() {
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

    workflow.emit('sendEmail');
  });

  workflow.on('sendEmail', function() {
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
  });

  workflow.emit('validate');
};
