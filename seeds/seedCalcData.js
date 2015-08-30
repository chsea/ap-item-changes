var mongoose = require('mongoose');
var Promise = require('bluebird');
var models = require('./../models/index');
var Item = models.Item;
var Champion = models.Champion;
var Participant = models.Participant;

// Champion count
Champion.find().exec().then(function(champions) {
  champions.forEach(function(champion) {
    Participant.count({champion: champion.id, winner: true, postPatch: true}, function(err, count) { //true
      if (err) return console.log(err);
      console.log(count);
      champion.winsPost = count; //Post
      champion.save();
    });
  });
});

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

// ItemsPre for Champions
// Champion.find().exec().then(function(champions) {
//   champions.forEach(function(champion) {
//     champion.itemsPre = [];
//     champion.itemsPost = [];
//     console.log(champion.itemsPost);
//     champion.markModified('itemsPre');
//     champion.save();
//   });
// });
// Champion.find().exec().then(function(champions) {
//   champions.forEach(function(champion) {
//     console.log(champion.id, champion.name);
//   });
// });
// //
// Champion.find().exec().then(function(champions) {
//   champions.forEach(function(champion) {
//     Item.find().then(function(items) {
//       var itemId = [];
//       var allItems = [];
//       items.forEach(function(item, i) {
//         itemId.push(item.id);
//         allItems.push(Participant.count({champion: champion.id, items: item.id, postPatch: true}).exec());
//       });
//       Promise.all(allItems).then(function(champItems) {
//         champion.itemsPost = [];
//         champItems.forEach(function(champItem, i) {
//           if(champItem > 0) champion.itemsPost.push({id: itemId[i], count: champItem});
//         });
//         console.log(champion.itemsPost);
//         champion.markModified('itemsPost');
//         champion.save().then(function(champion) {
//           console.log('postsave', champion.itemsPost);
//         });
//       });
//     });
//   });
// });

// , function(err, count) {
//   if (err) return console.log(err);
//   champion.itemsPre[i] = {id: item.id, count: count};
//   console.log('presave', champion.itemsPre);
//   champion.markModified('itemsPre');
//   champion.save().then(function(champion) {
//     console.log('postsave', champion.itemsPre);
//   });
  //     participants.forEach(function(participant) {
  //       participant.items.forEach(function(item) {
  //         var idx = -1;
  //         champion.itemsPre.some(function(champItem, i) {
  //           if (champItem.id === item) {
  //             idx = i;
  //             return true;
  //           }
  //         });
  //         if (idx > -1) champion.itemsPre[idx].count++;
  //         else champion.itemsPre.push({id: item, count: 1});
  //         console.log(champion.itemsPre);
  //         champion.markModified('itemsPre');
  //         champion.save();
  //       });
  //     });
  //   });
  // });
//
// Champion.findOne({id: 82}).exec().then(function(champion) {
//   console.log(champion.itemsPre.length);
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
// setAvg(Champion, 'avgAssistsPre', Participant, 'assists', false, 'champion');
