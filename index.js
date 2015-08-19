var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/league');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var matchSchema = new mongoose.Schema({
  id: {type: Integer, required: true },
  champions: {type: [Integer], required: true}
});

var Match = mongoose.model('Match', matchSchema);

module.exports = {
  Match: Match
};
