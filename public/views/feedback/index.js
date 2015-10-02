/* global app:true */

(function() {
  'use strict';

  app = app || {};

  app.Feedback = Backbone.Model.extend({
    initialize: function(){
      
    },

    url: '/feedback/',
    defaults: {
      success: false,
      errors: [],
      errfor: {},
      name: '',
      subject: '',
      email: '',
      message: ''
    }
  });

  app.FeedbackView = Backbone.View.extend({
    el: '#feedback',
    template: _.template( $('#tmpl-feedback').html() ),
    events: {
      'submit form': 'preventSubmit',
      'click .btn-feedback': 'feedback'
    },
    initialize: function() {
      this.model = new app.Feedback();
      this.listenTo(this.model, 'sync', this.render);
      this.render();
    },
    render: function() {
    //  this.$el.html(this.template( this.model.attributes ));
      this.$el.find('[name="name"]').focus();
    },
    preventSubmit: function(event) {
      event.preventDefault();
    },
    feedback: function() {
      this.$el.find('.btn-feedback').attr('disabled', true);

      this.model.save({
        name: this.$el.find('[name="name"]').val(),
        subject: this.$el.find('[name="subject"]').val(),
        email: this.$el.find('[name="email"]').val(),
        message: this.$el.find('[name="message"]').val()
      });
    }
  });

  $(document).ready(function() {
    app.FeedbackView = new app.FeedbackView();
  });
}());
