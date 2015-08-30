var mongoose = require('mongoose');
var Participant = require('./participant');

var championSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String, required: true},
  title: String,
  countPre: Number,
  countPost: Number,
  winsPre: Number,
  winsPost: Number,
  avgMagicDamageToChampsPre: Number,
  avgMagicDamageToChampsPost: Number,
  avgTotalDamageToChampsPre: Number,
  avgTotalDamageToChampsPost: Number,
  avgKillsPre: Number,
  avgKillsPost: Number,
  avgDeathsPre: Number,
  avgDeathsPost: Number,
  avgAssistsPre: Number,
  avgAssistsPost: Number,
  itemsPre: [],
  itemsPost: []
});

championSchema.virtual('avgKdaPostdaPre').get(function() {
  if (this.avgDeathsPre === 0) return this.avgKillsPre + this.avgAssistsPre;
  return (this.avgKillsPre + this.avgAssistsPre) / this.avgDeathsPre;
});

championSchema.virtual('avgKdaPost').get(function() {
  if (this.avgDeathsPost === 0) return this.avgKillsPost + this.avgAssistsPost;
  return (this.avgKillsPost + this.avgAssistsPost) / this.avgDeathsPost;
});

championSchema.virtual('percentPlayedPre').get(function() {
  return (this.countPre / Participant.getTotalMatchesPre());
});

championSchema.virtual('percentPlayedPost').get(function() {
  return (this.countPost / Participant.getTotalMatchesPost());
});

championSchema.virtual('winRatePre').get(function() {
  return (this.winsPre / this.countPre);
});

championSchema.virtual('winRatePost').get(function() {
  return (this.winsPost / this.countPost);
});

module.exports = mongoose.model('Champion', championSchema);
