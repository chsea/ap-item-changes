var mongoose = require('mongoose');
var Promise = require('bluebird');
var models = require('./../models/index2');
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

//Champions for Items
// Item.find().exec().then(function(items) {
//   items.forEach(function(item) {
//     Champion.find({itemsPre: item.id}).exec().then(function(champions) {
//       allChamps = champions.reduce(function(items, champion) {
//         items[champion.id] = champion.itemsPre[item.id];
//         return items;
//       }, {});
//       console.log('all champions: ', allChamps);
//       item.champsPre = allChamps;
//       item.markModified('itemsPre');
//       item.save();
//     });
//   });
// });

Champion.findOne().exec().then(function(champ) {
  console.log(champ.countPost);
});

// function averageOfField(model, field, select){
//   var total = 0;
//   return model.find(select).exec().then(function(documentArray){
//     var countPromise = model.count(select).exec();
//     console.log("documentArray: ", documentArray);
//     documentArray.forEach(function(doc){
//       total += doc[field];
//     });
//     return countPromise.then(function(count){
//       return total / count;
//     });
//   }).then(null, function(err){
//     console.error(err);
//   });
// }
//
// function setAvg(model, field, avgModel, avgField, patch, match){
//   model.find().exec().then(function(docs){
//     docs.forEach(function(doc){
//       var select = {postPatch: patch};
//       select[match] = doc.id;
//       averageOfField(avgModel, avgField, select)
//       .then(function(average){
//         if(isNaN(average)) throw new Error(String(doc.id) + ' has no average');
//         console.log(String(doc.id) + " average: ", average);
//         doc[field] = average;
//         console.log(doc);
//         doc.save().then(function(doc){
//           console.log("saved: " + doc.id);
//         })
//         .then(null, function(err){console.log('save didnt work');});
//       })
//       .then(null, function(err){
//         console.log(err.message);
//       });
//     });
//   });
// }
//
// // setAvg(Champion, 'avgMagicDamagePre', Participant, 'magicDamage', false, 'champion');
// setAvg(Champion, 'avgTotalDamageToChampsPost', Participant, 'totalDamageToChamps', true, 'champion');
