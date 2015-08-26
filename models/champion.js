var mongoose = require('mongoose');
var Participant = require('./participant');

var championSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String, required: true},
  title: String,
  countPre: Number,
  countPost: Number,
  avgWinRatePre: Number,
  avgWinRatePost: Number,
  avgMagicDamagePre: Number,
  avgMagicDamagePost: Number,
  avgMagicDamageToChampsPre: Number,
  avgMagicDamageToChampsPost: Number,
  avgTotalDamageToChampsPre: Number,
  avgTotalDamageToChampsPost: Number,
  avgKillsPre: Number,
  avgKillsPost: Number,
  avgAssistsPre: Number,
  avgAssistsPost: Number,
  itemsPre: [Number],
  itemsPost: [Number],
});

championSchema.virtual('avgKdaPre').get(function() {
  return (this.avgKillsPre + this.avgAssistsPre) / this.avgDeathsPre;
});

championSchema.virtual('avgKdaPost').get(function() {
  return (this.avgKillsPost + this.avgAssistsPost) / this.avgDeathsPost;
});

championSchema.methods.getAvg = function(field){

}

module.exports = mongoose.model('Champion', championSchema);
