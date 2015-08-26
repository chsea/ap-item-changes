var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  name: {type: String, required: true},
  countPre: Number,
  countPost: Number
});

var changedItemSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String, required: true},
  patchNotes: String
});

module.exports.Item = mongoose.model('Item', itemSchema);
module.exports.ChangedItem = mongoose.model('ChangedItem', changedItemSchema);
