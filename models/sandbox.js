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
  return model.find().exec().then(function(fieldArray){
    var countPromise = model.count().exec();
    fieldArray.forEach(function(field){
      total += field;
    })
    return countPromise.then(function(count){
      return total / count;
    })
  }).catch(function(err){
    console.error(err);
  })
}


















//ItemsPre
Champion.find({}, 'id').exec().then(function(champions) {
  champions.forEach(function(champion) {
    Participant.find({champion: champion.id}, 'items').exec().then(function(participants) {
      participants.items.reduce()
    })
  })
})
