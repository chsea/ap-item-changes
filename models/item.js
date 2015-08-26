var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String, required: true},
  changed: {type: Boolean, required: true},
  patchNotes: String,
  countPre: Number,
  countPost: Number,
  championsPre: [Number],
  championsPost: [Number]
});

module.exports.Item = mongoose.model('Item', itemSchema);
module.exports.ChangedItem = mongoose.model('ChangedItem', changedItemSchema);
