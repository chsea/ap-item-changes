var Promise = require('bluebird');
var readFile = Promise.promisify(require("fs").readFile);
var https = require("https");
//var get = Promise.promisify(require("https").get);
// var models = require('./index.js');
// var Match = models.Match;

// var matchPath = './AP_ITEM_DATASET/5.11/NORMAL_5X5/';
// var matches = readFile(matchPath + 'NA.json').then(function(matches) {
//   return JSON.parse(matches).slice(0, 10);
// });
//
// matches.then(function(matches) {
//   matches.forEach
// })

https.get('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/seaasong?api_key=daf26bdd-8fb1-4722-b26c-496eed56edbc', function(err, data) {
  if (err) console.error(err);
  console.log(data);
});
