'use strict';
/*

 Think of Accounts as the "customers" of a 
 system and think of Admins as the "owners" and/or "employees". 
 Why are roles separate from Users? For sanity really. 

 Did you realize that both Admins and Accounts are indeed Users? 
 Both of them need to login, both of them can forget their passwords and have them reset. 
 Storing user information on both the Account and Admin schemas would complicate the login 
 logic, forcing us to overly abstract it or even duplicate it by creating two separate 
 login screens.

 Confirmation email:
 A recent feature added to the project was the ability to validate Account email addresses 
 by sending an email to the person who registered and having them click a link.
 This feature was only necessary for Accounts, as Admins wouldn't need this functionality 
 since they can't register.

*/
exports = module.exports = function(app, mongoose) {
  var accountSchema = new mongoose.Schema({
    user: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, default: '' }
    },
    isVerified: { type: String, default: '' },
    verificationToken: { type: String, default: '' },
    name: {
      first: { type: String, default: '' },
      middle: { type: String, default: '' },
      last: { type: String, default: '' },
      full: { type: String, default: '' }
    },
    company: { type: String, default: '' },
    phone: { type: String, default: '' },
    zip: { type: String, default: '' },
    status: {
      id: { type: String, ref: 'Status' },
      name: { type: String, default: '' },
      userCreated: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, default: '' },
        time: { type: Date, default: Date.now }
      }
    },
    statusLog: [mongoose.modelSchemas.StatusLog],
    notes: [mongoose.modelSchemas.Note],
    userCreated: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, default: '' },
      time: { type: Date, default: Date.now }
    },
    search: [String]
  });
  accountSchema.plugin(require('./plugins/pagedFind'));
  accountSchema.index({ user: 1 });
  accountSchema.index({ 'status.id': 1 });
  accountSchema.index({ search: 1 });
  accountSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Account', accountSchema);
};
