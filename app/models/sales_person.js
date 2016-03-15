/**
 * Created by gsolis on 3/11/16.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

  salesPersonSchema = new Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    commissionType: String,
    commission: String,
    deleted: Boolean
  }, { collection: 'sales_persons' });

module.exports = mongoose.model('salesPerson', salesPersonSchema);