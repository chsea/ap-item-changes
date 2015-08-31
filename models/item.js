var mongoose = require('mongoose');
var Participant = require('./participant');

var itemSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String, required: true},
  changed: {type: Boolean},
  patchNotes: {},
  countPre: Number,
  countPost: Number,
  champsPre: [],
  champsPost: []
});

itemSchema.virtual('percentUsedPre').get(function() {
  return (this.countPre / Participant.getTotalMatchesPre() * 10).toFixed(2);
});

itemSchema.virtual('percentUsedPost').get(function() {
  return (this.countPost / Participant.getTotalMatchesPost() * 10).toFixed(2);
});

module.exports = mongoose.model('Item', itemSchema);
