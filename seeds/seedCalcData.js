var mongoose = require('mongoose');
var Promise = require('bluebird');
var models = require('./../models/');
var Item = models.Item;
var Champion = models.Champion;
var Participant = models.Participant;

// Champion count
// Champion.find().exec().then(function(champions) {
//   champions.forEach(function(champion) {
//     Participant.count({champion: champion.id, winner: true, postPatch: true}, function(err, count) { //true
//       if (err) return console.log(err);
//       console.log(count);
//       champion.winsPost = count; //Post
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

// Item.find().exec().then(function(items) {
//   items.forEach(function(item) {
//     item.champsPre = [];
//     item.champsPost = [];
//     console.log(item.champsPost);
//     item.markModified('champsPre');
//     item.markModified('champsPost');
//     item.save();
//   });
// });
// Item.find().exec().then(function(items) {
//   items.forEach(function(item) {
//     Champion.find().exec().then(function(champions) {
//       champions.forEach(function(champion) {
//         var count = 0;
//         if (champion.itemsPre.some(function(champItem) {
//           if (champItem.id === item.id) {
//             count = champItem.count;
//             return true;
//           }
//         })) {
//           item.champsPre.push({id: champion.id, count: count});
//           item.markModified('champsPre');
//         }
//       });
//       console.log('pre', item.champsPre);
//       item.save().then(function(item) {
//         console.log('post', item.champsPre);
//       });
//     });
//   });
// });

Item.find().exec().then(function(items) {
  items.forEach(function(item) {
    var champs = [];
    item.champsPost.forEach(function(champ) {
      champs.push(Champion.findOne({id: champ.id}).select('countPost').exec());
    });
    Promise.all(champs).then(function(champions) {
      champions.forEach(function(champ, i) {
        item.champsPost[i].champTotal = champ.countPost;
      });
      item.markModified('champsPost');
      item.save().then(function(item) {
        console.log(item.champsPost);
      });
    });
  });
});

// Item.findOne({id: 3089}).exec().then(function(item) {
//   item.changed = true;
//   item.patchNotes = {Recipe_Change: 'NLR + Blasting Wand + Amplifying Tome', Total_Cost: '3300 G --> 3500 G', Ability_Power: 'UNCHANGED', UNIQUE_Passive: '30% Ability Power Amp --> 35% Ability Power Amp', Notes: ['Deathcap\'s change mostly revolves around keeping total final AP of the damage build the same - while being able to nerf the individual AP items to have more comparable numbers to each other. As Deathcap is the keystone I want a lot of AP item - we pushed the power here.']};
//   item.markModified('patchNotes');
//   item.save().then(function(item) {
//     console.log(item.name, item.changed, item.patchNotes);
//   });
// });
//
// Item.findOne({id: 3157}).exec().then(function(item) {
//   item.changed = true;
//   item.patchNotes = {Total_Cost: '3300 G --> 3000 G', Ability_Power: '120 Ability Power --> 100 Ability Power'};
//   item.save().then(function(item) {
//     console.log(item.name, item.changed, item.patchNotes);
//   });
// });
//
// Item.findOne({id: 3285}).exec().then(function(item) {
//   item.changed = true;
//   item.patchNotes = {Total_Cost: '3100 G --> 3000 G', Ability_Power: '120 Ablity Power --> 100 Ability Power', Movement_Speed: '7% Movement Speed --> 10% Movement Speed', Notes: ['Luden\'s is a terrifying item in terms of the general poke power it adds - Luden\'s probably needs a more solid identity that \'raw power\' - so we\'ve been pushing the item to be more and more about being mobility focused rather than spam spell focused.', 'I suspect we\'ll eventually need to do more to the item but it\'d most likely be more of a slow burn.']};
//   item.save().then(function(item) {
//     console.log(item.name, item.changed, item.patchNotes);
//   });
// });
//
//  Item.findOne({id: 3003}).exec().then(function(item) {
//    item.changed = true;
//    item.patchNotes = {Recipe_Change: 'NLR + Tear of the Goddess + 1030 G', Total_Cost: '2700 G --> 3000 G', Ability_Power: '60 Base AP --> 80 Base AP', Notes: ['Making more items build out of NLR in the hopes of expanding the high-tier AP space. AAA is definitely deserving of being one of the high tier AP slots, given its general growth pattern and the fact that it\'s attached to a quest in order to achieve maximum AP potential.']};
//    item.save().then(function(item) {
//      console.log(item.name, item.changed, item.patchNotes);
//    });
//  });
//
// Item.findOne({id: 3027}).exec().then(function(item) {
//   item.changed = true;
//   item.patchNotes = {Total_Cost: '2800 G --> 2700 G', Health: '450 Base Health --> 300 Base Health', Mana: '450 Base Mana --> 400 Base Mana', Passive1: '20 Health Growth / 200 Maximum Health UNCHANGED.', Passive2: '20 Mana Growth / 200 Maximum Mana --> 40 Mana Growth / 400 Maximum Mana', Passive3: '2 Ability Power / 20 Maximum Ability Power --> 4 Ability Power / 40 Maximum Ability Power', Notes: ['Rod is currently leaning a bit too much towards favoring AP Heavies with the statline - while not really solving Mana / AP concerns for mages who want to pick it up. Going to adjust the item to more favor the Mana and Offensive statistics of this item, especially over time.']};
//   item.save().then(function(item) {
//     console.log(item.name, item.changed, item.patchNotes);
//   });
// });
//
// Item.findOne({id: 3115}).exec().then(function(item) {
//   item.changed = true;
//   item.patchNotes = {Total_Cost: '2920 G --> 3000 G', Attack_Speed: '50% Attack Speed --> 40% Attack Speed', Ability_Power: '60 Ability Power --> 80 Ability Power', Notes: ['We\'re also pushing more items up to compete in the 80 Ability Power range - While Nashor\'s is a fine purchase for people who already have strong on-hit procs - the ratio of Attack Speed to Spells favored these characters probably a bit too hard.', 'Nashor\'s should be acceptable as a niche for certain mages that can use their autoattacks well - but also have decent ratios.', '(I\'m not being biased here at all. I don\'t know who you\'re talking about.)']};
//   item.save().then(function(item) {
//     console.log(item.name, item.changed, item.patchNotes);
//   });
// });
//
// Item.findOne({id: 3116}).exec().then(function(item) {
//   item.changed = true;
//   item.patchNotes = {Recipe_Change: "NLR + Amplifying Tome + Giant's Belt", Total_Cost: "2900 G --> 3000 G", Passive_Updated: '',
//   Single_Target: '35% Slow for 1.5 seconds --> 40% Single Target Slow for 1.5 seconds', Instant_AoE: '15% Slow for 1.5 seconds --> 40% Slow for 1 second', DoT_or_Multi_hit: '15% slow for 1.5 seconds --> 20% Slow for 1 second', Summoned_Minions_NEW: '20% Slow for 1 second.', Note: 'If a spell fits in more than one category - it\'ll generally use the weakest slow.', Notes: ["Rylai's is currently good in a few scenarios, namely - do you have a spammable single target spell and a train pattern - a large part of this is the fact that the AoE / DoT portions of the slow are so weak in comparison to the single target slow. Changing the tactic here to make those slows have less overall duration rather than penalizing the direct effect.", "This is a very powerful push in terms of Rylai's overall power - but we'll be looking at modifying and cleaning up of the slow rules as well either now or in the near future.", "(Also added a self-only freeze particle effect so you can watch everyone become ice cubes when you're slowing them. FOR CLARITY.)"]};
//   item.save().then(function(item) {
//     console.log(item.name, item.changed, item.patchNotes);
//   });
// });

// Item.findOne({id: 3136}).exec().then(function(item) {
//   item.changed = true;
//   item.patchNotes = {Total_Cost: '1480G --> 1500 G', Notes: ['Wait for it...']};
//   item.save().then(function(item) {
//     console.log(item.name, item.changed, item.patchNotes);
//   });
// });
//
// Item.findOne({id: 3151}).exec().then(function(item) {
//   item.changed = true;
//   item.patchNotes = {Recipe_Change: 'Haunting Guise + Blasting Wand', Total_Cost: '2900 G --> 3000 G', Ability_Power: '50 Base AP --> 80 Base AP', Notes: ["Liandry's Torment is designed to be able to fit as a High Health / Low Resistance shredder (hence the combination of health damage + flat penetration). However, the lower AP on the item frequently meant your kit didn't actually work. Aggressively pushing the power of this build to be able to compete with the more immediate damage type builds - like proc builds."]};
//   item.save().then(function(item) {
//     console.log(item.name, item.changed, item.patchNotes);
//   });
// });
//
// Item.findOne({id: 3152}).exec().then(function(item) {
//   item.changed = true;
//   item.patchNotes = {Spell_Vamp: '20% Spell Vamp --> 0% Spell Vamp', New_UNIQUE_Passive: "Your spells and abilities heal you for 15% of the damage dealt, calculated BEFORE your opponent's resistances. 33% effect for AoE Spells.", Notes: ["You need so many things to get a Spell Vamp build to work. You have to be resistant enough to not get bursted. You have to deal a sufficient amount of raw damage in order to heal. You probably need to be ahead to outscale the opponent's resistances. You need a ton of base damage. Therefore - this change is trying to reduce the number of dependencies needed in order to 'turn on.' You won't need Pen to heal from this item on champions. Spell Vamp builds are fairly problematic to control once they get rolling - so they tend to be pretty binary.", "The hope here is that there's a lower spell vamp value and less healing generally in exchange for not needing so much to get started."]};
//   item.save().then(function(item) {
//     console.log(item.name, item.changed, item.patchNotes);
//   });
// });
//
// Item.findOne({id: 3165}).exec().then(function(item) {
//   item.changed = true;
//   item.patchNotes = {Recipe_Change: "Codex + Idol + Amplifying Tome", Total_Cost: "Unchanged", Notes: ["Wanted to increase the number of potential purchase options at the ~1200 G level.", "I'm attempting to make Codex + Book or Wisp + Book potentially attractive choices compared to NLR, especially on your first back. You'll get more interim power than the NLR - at the slight cost of strongly telegrahing what you're going to build and locking yourself into a build. It's mostly an experiment to see if players like having this kind of choice between 800 + 400 component vs. ~1200 mid-tier.", "It makes the recipe a bit bloated but... yeah."]};
//   item.save().then(function(item) {
//     console.log(item.name, item.changed, item.patchNotes);
//   });
// });
//
// Item.findOne({id: 3174}).exec().then(function(item) {
//   item.changed = true;
//   item.patchNotes = {Recipe_Change: "Codex + Chalice + Amplifying Tome", Total_Cost: "Unchanged", Notes: ['See Omnomnomicon.']};
//   item.save().then(function(item) {
//     console.log(item.name, item.changed, item.patchNotes);
//   });
// });
//
// Item.findOne({id: 3135}).exec().then(function(item) {
//   item.changed = true;
//   item.patchNotes = {Total_Cost: '2295 G --> 2500 G', Ability_Power: '70 Ability Power --> 80 Ability Power', Notes: ["Void Staff's raw efficiency is pretty high compared to some of the other items on the list.", "While % Penetration will always be a great multiplier for damage for any damage oriented mage - you don't really need it to also be such a great source of Ability Power. This pushes Void Staff's efficiency more in line with some of the other items with comparable multipliers. Also adding a bit of AP to ensure that players end up at roughly the same amount of AP they did pre-patch.", "Edit: Okay - so these are testing well enough internally - and syncing up with ManWolfAxeBoss - NLR will be making its return to CS and TT."]};
//   item.save().then(function(item) {
//     console.log(item.name, item.changed, item.patchNotes);
//   });
// });


//[1026, 1058, 3089]

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
