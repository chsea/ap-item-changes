var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/league');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var matchSchema = new mongoose.Schema({
  id: {type: Number, required: true },
  champions: {type: [Number], required: true}
});

var Match = mongoose.model('Match', matchSchema);

module.exports = {
  Match: Match
};
