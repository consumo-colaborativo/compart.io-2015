'use strict'; // DRYWALL SCHEMA + COMPARTIO SCHEMA
/* The User schema was designed to facilitate the login system no matter what role is 
being played. After a user is authenticated you have access to the roles that user can play.
*/
exports = module.exports = function(app, mongoose) {
  var userSchema = new mongoose.Schema({
    // General User's Field (Drywall User's Field)
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    name: { type: String},
    lastname: { type: String},
    about: String,
    url_image: String,
    roles: {
      admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
      account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
    },
    isActive: String,
    timeCreated: { type: Date, default: Date.now },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    twitter: {},
    github: {},
    facebook: {},
    google: {},
    tumblr: {},
    search: [String],
    // User's Field related to COMPART.IO
    screen_name  : { type: String, default: 'compart.io' },
    karma        : { type: Number, default: '0'},
    //
    street       : { type: String, default: 'sin definir' },
    zip_code     : { type: Number },
    city         : { type: mongoose.Schema.Types.ObjectId,
                     ref: 'City',
                      required: true}
  });
  userSchema.methods.canPlayRoleOf = function(role) {
    if (role === "admin" && this.roles.admin) {
      return true;
    }

    if (role === "account" && this.roles.account) {
      return true;
    }

    return false;
  };
  userSchema.methods.defaultReturnUrl = function() {
    var returnUrl = '/';
    if (this.canPlayRoleOf('account')) {
      returnUrl = '/account/';
    }

    if (this.canPlayRoleOf('admin')) {
      returnUrl = '/admin/';
    }

    return returnUrl;
  };
  userSchema.statics.encryptPassword = function(password, done) {
    var bcrypt = require('bcrypt');
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return done(err);
      }

      bcrypt.hash(password, salt, function(err, hash) {
        done(err, hash);
      });
    });
  };
  userSchema.statics.validatePassword = function(password, hash, done) {
    var bcrypt = require('bcrypt');
    bcrypt.compare(password, hash, function(err, res) {
      done(err, res);
    });
  };
  userSchema.plugin(require('./plugins/pagedFind'));
  userSchema.index({ username: 1 }, { unique: true });
  userSchema.index({ email: 1 }, { unique: true });
  userSchema.index({ timeCreated: 1 });
  userSchema.index({ 'twitter.id': 1 });
  userSchema.index({ 'github.id': 1 });
  userSchema.index({ 'facebook.id': 1 });
  userSchema.index({ 'google.id': 1 });
  userSchema.index({ search: 1 });
  userSchema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('User', userSchema);
};
