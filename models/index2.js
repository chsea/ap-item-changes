var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/league-test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

module.exports = {
  Participant: require('./participant'),
  Item: require('./item'),
  Champion: require('./champion')
};
