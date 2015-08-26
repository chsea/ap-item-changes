var mongoose = require('mongoose');

var championSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String, required: true},
  title: String,
  countPre: Number,
  countPost: Number,
  kdaPre: Number,
  kdaPost: Number
  //Whatever dmg we want
});

module.exports = mongoose.model('Champion', championSchema);
