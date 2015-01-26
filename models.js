'use strict';
/* All the schemas are included here  15 */

exports = module.exports = function(app, mongoose) {
  // Embeddable docs first DRYWALL 
  require('./schema/Status')(app, mongoose);
  require('./schema/Category')(app, mongoose);

  // Then regular docs DRYWALL
  require('./schema/User')(app, mongoose);
  require('./schema/AdminGroup')(app, mongoose);
  require('./schema/Admin')(app, mongoose);
  require('./schema/Account')(app, mongoose);
  require('./schema/LoginAttempt')(app, mongoose);

  require('./schema/Note')(app, mongoose); 
  require('./schema/StatusLog')(app, mongoose); //

  // Compartio schemas 6
  require('./schema/Country')(app, mongoose);
  require('./schema/City')(app, mongoose);

  require('./schema/Compartiocategory')(app, mongoose);

  require('./schema/Feedback')(app, mongoose);

  require('./schema/Compartio')(app, mongoose);
  require('./schema/Message')(app, mongoose);
};
