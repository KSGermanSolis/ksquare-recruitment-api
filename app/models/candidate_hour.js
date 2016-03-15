/**
 * Created by gsolis on 3/10/16.
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,

  candidateHourSchema = new Schema({
    id: String,
    candidateId: String,
    hours: Object
  }, { collection: 'candidate_hours' });

module.exports = mongoose.model('candidateHour', candidateHourSchema);