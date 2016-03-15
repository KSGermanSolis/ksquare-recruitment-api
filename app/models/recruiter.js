/**
 * Created by gsolis on 3/11/16.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

  recruiterSchema = new Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    commissionType: String,
    commission: String,
    deleted: Boolean
  });

module.exports = mongoose.model('recruiter', recruiterSchema);