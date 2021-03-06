/**
 * Created by gsolis on 3/9/16.
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,

  candidateSchema = new Schema({
    id: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    title: String,
    client: String,
    billRate: String,
    payRate: String,
    startDate: Date,
    endDate: Date,
    recruiterId: String,
    salesPerson: String
  });

module.exports = mongoose.model('candidate', candidateSchema);