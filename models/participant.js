var mongoose = require('mongoose');

var participantSchema = new mongoose.Schema({
  champion: {type: Number, required: true},
  lane: {type: String, required: true},
  items: {type: [Number], required: true},
  winner: {type: Boolean, required: true},
  magicDamageDealt: {type: Number, required: true},
  magicDamageDealtToChampions: {type: Number, required: true},
  kills: {type: Number, required: true},
  deaths: {type: Number, required: true},
  assists: {type: Number, required: true},
  postPatch: {type: Boolean, required: true}
});

participantSchema.virtual('kda').get(function() {
  return (this.kills + this.assists) / this.deaths;
});

participantSchema.methods.hasItem = function(item) {
  return this.items.some(function(currentItem) {
    return currentItem === item;
  });
};

module.exports = mongoose.model('Participant', participantSchema);
