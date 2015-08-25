var mongoose = require('mongoose');
var Promise = require('bluebird');
var readFile = Promise.promisify(require("fs").readFile);
var writeFile = Promise.promisify(require("fs").writeFile);
var https = require("https");
var models = require('./models');
var Participant = models.Participant;

var matchPath = './AP_ITEM_DATASET/5.11/NORMAL_5X5/';
readFile(matchPath + 'NA.json').then(function(matches) {
  return JSON.parse(matches).slice(0, 4);
}).then(function(matches) {
  var adding = setInterval(add, 1000);
  function add(match) {
    if (matches.length) addToDb(matches.pop());
  }
  if (!matches.length) clearInterval(adding);
});

function addToDb(match) {
  https.get('https://na.api.pvp.net/api/lol/na/v2.2/match/' + match + '?includeTimeline=true&api_key=daf26bdd-8fb1-4722-b26c-496eed56edbc', function(res) {
    var count = 0;
    var matchData = "";
    res.on('data', function(dataChunk) {
      matchData += dataChunk;
    });

    res.on('end', function(){
      matchData = JSON.parse(matchData);
      matchData.participants.forEach(function(p) {
        var stats = p.stats;
        var participant = {
          champion: p.championId,
          lane: p.timeline.lane,
          items: [stats.item0, stats.item1, stats.item2, stats.item3, stats.item4, stats.item5, stats.item6],
          winner: stats.winner,
          magicDamageDealt: stats.magicDamageDealt,
          magicDamageDealtToChampions: stats.magicDamageDealtToChampions,
          kills: stats.kills,
          deaths: stats.deaths,
          assists: stats.assists,
          postPatch: false
        };
        Participant.create(participant, function(err, data) {
          if(err) console.error(err);
          console.log(++count);
        });
      });
    });
  }).on('error', function(err) {
      console.error(err);
  });
}
