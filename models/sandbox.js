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


var championSchema = new mongoose.Schema({
  // id: {type: Number, required: true, unique: true},
  // name: {type: String, required: true},
  // title: String,
  // countPre: Number,
  // countPost: Number,
  avgWinRatePre: Number,
  avgWinRatePost: Number,
  avgMagicDamagePre: Number,
  avgMagicDamagePost: Number,
  avgMagicDamageToChampsPre: Number,
  avgMagicDamageToChampsPost: Number,
  avgTotalDamageToChampsPre: Number,
  avgTotalDamageToChampsPost: Number,
  avgKillsPre: Number,
  avgKillsPost: Number,
  avgAssistsPre: Number,
  avgAssistsPost: Number,
  itemsPre: [Number],
  itemsPost: [Number],
});

function averageOfField(model, field){
  var total = 0;
  return model.find().exec().then(function(documentArray){
    var countPromise = model.count().exec();
    console.log("documentArray: ", documentArray);
    documentArray.forEach(function(doc){
      total += doc[field];
      console.log("field: ", field);
      console.log("doc[field]: ", doc[field]);
      console.log("doc: ", doc);
    });
    return countPromise.then(function(count){
      return total / count;
    });
  }).then(null, function(err){
    console.error(err);
  });
}






function averageOfField(model, field, select){
  var total = 0;
  return model.find(select).exec().then(function(documentArray){
    var countPromise = model.count(select).exec();
    console.log("documentArray: ", documentArray);
    documentArray.forEach(function(doc){
      total += doc[field];
    });
    return countPromise.then(function(count){
      return total / count;
    });
  }).then(null, function(err){
    console.error(err);
  });
}


Item.find().exec().then(function(items){
  items.forEach(function(item){
    averageOfField(models.Participant, 'totalDamageToChamps', {postPatch: true, items: item.id})
    .then(function(average){
      if(isNaN(average)) throw new Error(String(item.id) + ' has no average');
      console.log(String(item.id) + " average: ", average);
      item.avgTotalDamageToChampsPost = average;
      console.log(item);
      item.save().then(function(item){
        console.log("saved: " + item.id);
      })
      .then(null, function(err){console.log('save didnt work');});
    })
    .then(null, function(err){
      console.log(err.message);
    });
  });
});




var itemSchema = new mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String, required: true},
  changed: {type: Boolean},
  patchNotes: String,
  countPre: Number,
  avgTotalDamageToChampsPost: Number
  countPost: Number,
  championsPre: [Number],
  championsPost: [Number]
});



//avgWinRatePre
Champion.find().exec().then(function(champions) {
  champions.forEach(function(champion) {
    Participant.count({winner: true, postPatch: false}, function(err, count) {
      if (err) return console.log(err);
      console.log(count);
      champion.winRatePre = count / champion.countPre;
      champion.save();
    });
  });
});


//ItemsPre
Champion.find().exec().then(function(champions) {
  champions.forEach(function(champion) {
    Participant.find({champion: champion.id, postPatch: false}, 'items').exec().then(function(participants) {
      allItems = participants.items.reduce(function(items, item) {
        items.item = items.item || 0;
        items.item++;
        return items;
      }, {});
      console.log('allItems: ', allItems);
      champion.itemsPre = allItems;
      champion.markModified('itemsPre');
      champion.save();
    });
  });
});
