var mongoose = require('mongoose');
var Promise = require('bluebird');
var readFile = Promise.promisify(require("fs").readFile);
var https = require("https");
var models = require('./index.js');
var Participant = models.Participant;

var matchPath = './AP_ITEM_DATASET/5.11/NORMAL_5X5/';
var matches = readFile(matchPath + 'NA.json').then(function(matches) {
  return JSON.parse(matches).slice(1, 2);
});

matches.then(function(matches) {
  matches.forEach(function(match) {
    https.get('https://na.api.pvp.net/api/lol/na/v2.2/match/' + match + '?includeTimeline=true&api_key=daf26bdd-8fb1-4722-b26c-496eed56edbc', function(res) {
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
    				damageDealt: stats.totalDamageDealt,
    				kills: stats.kills,
    				deaths: stats.deaths,
    				assists: stats.assists,
    				postPatch: false
          };
          Participant.create(participant, function(err, data) {
      			if(err) console.error(err);
            console.log("created: ", data);
          });
        });
    	});
    }).on('error', function(err) {
      	console.error(err);
    });
  });
});
