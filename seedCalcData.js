var mongoose = require('mongoose');
var Promise = require('bluebird');
var models = require('./models/index2');
var Item = models.Item;
var Champion = models.Champion;
var Participant = models.Participant;

// Champion count
// Champion.find().exec().then(function(champions) {
//   champions.forEach(function(champion) {
//     Participant.count({champion: champion.id, postPatch: true}, function(err, count) { //true
//       if (err) return console.log(err);
//       console.log(count);
//       champion.countPost = count; //Post
//       champion.save();
//     });
//   });
// });

//Item count
// Item.find().exec().then(function(items) {
//   items.forEach(function(item) {
//     Participant.count({items: item.id, postPatch: false}, function(err, count) {
//       if (err) return console.log(err);
//       console.log(count);
//       item.countPre = count;
//       item.save();
//     });
//   });
// });

//ItemsPre for Champions
// Champion.find().exec().then(function(champions) {
//   champions.forEach(function(champion) {
//     Participant.find({champion: champion.id, postPatch: false}).exec().then(function(participants) {
//       participants.forEach(function(participant) {
//         participant.items.forEach(function(item) {
//           champion.itemsPre[item] = champion.itemsPre[item] || 0;
//           champion.itemsPre[item]++;
//           console.log('allItems: ', champion.itemsPre);
//           champion.markModified('itemsPre');
//           champion.save();
//         }, {});
//       });
//     });
//   });
// });
