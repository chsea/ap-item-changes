var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String, required: true},
  changed: {type: Boolean},
  patchNotes: String,
  countPre: Number,
  countPost: Number,
  championsPre: {},
  championsPost: {},
  avgTotalDamageToChampsPost: Number
});

itemSchema.statics.getName = function(id) {
  var name = '';
  this.findOne({id: id}).exec().then(function(item) {
    name = item.name;
  });
  return name;
};

module.exports = mongoose.model('Item', itemSchema);
