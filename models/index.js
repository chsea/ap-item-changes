var mongoose = require('mongoose');
mongoose.connect('mongodb://sea:massaro1@ds035703.mongolab.com:35703/heroku_qtswdrt1');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

module.exports = {
  Participant: require('./participant'),
  Item: require('./item'),
  Champion: require('./champion')
};
