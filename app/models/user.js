/**
 * Created by gsolis on 3/8/16.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    userSchema = new Schema({
      id: String,
      firstName: String,
      lastName: String,
      role: String,
      salt: String,
      password: String
    });

module.exports = mongoose.model('user', userSchema);