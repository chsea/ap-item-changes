var mongoose = require('mongoose');
var Promise = require('bluebird');
var models = require('./models');
var Item = models.Item;
var Champion = models.Champion;
var Participant = models.Participant;

//Champion count
// Champion.find().exec().then(function(champions) {
//   champions.forEach(function(champion) {
//     Participant.count({champion: champion.id, postPatch: true}, function(err, count) {
//       if (err) return console.log(err);
//       console.log(count);
//       champion.countPost = count;
//       champion.save();
//     });
//   });
// });

//Item count
// Item.find().exec().then(function(items) {
//   items.forEach(function(item) {
//     Participant.count({items: item.id, postPatch: true}, function(err, count) {
//       if (err) return console.log(err);
//       console.log(count);
//       item.countPost = count;
//       item.save();
//     });
//   });
// });
