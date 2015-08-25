var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/league');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

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

participantSchema.virtual('kda').get(function(){
  return (this.kills + this.assists) / this.deaths;
});

participantSchema.methods.hasItem = function(item) {
  return this.items.some(function(currentItem) {
    return currentItem === item;
  });
};

var itemSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  name: {type: String, required: true},
  countPre: {type: Number},
  countPost: {type: Number}
});

var championSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  name: {type: String, required: true},
  countPre: {type: Number},
  countPost: {type: Number}
});

var Participant = mongoose.model('Participant', participantSchema);
var Item = mongoose.model('Item', itemSchema);
var Champion = mongoose.model('Champion', championSchema);

module.exports = {
  Participant: Participant,
  Item: Item,
  Champion: Champion
};
