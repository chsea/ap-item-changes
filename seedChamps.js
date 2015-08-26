var mongoose = require('mongoose');
var Promise = require('bluebird');
var https = require('https');
var models = require('./models');
var Champion = models.Champion;

var count = 0;
function seed() {
  getChamp(count);
  count++;
  console.log(count);
}
setInterval(seed, 200);

function getChamp(id) {
	https.get('https://na.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + id + '?api_key=89461f6d-3866-4e53-bd57-2c8e3f8a4ced', function(res){
    var champData = '';
    res.on('data', function(dataChunk) {
      champData += dataChunk;
    });

    res.on('end', function() {
      try {
        champData = JSON.parse(champData);
      } catch(err) {
        return;
      }
      console.log(champData);
      console.log(count);
      var champ = {
        id: id,
        name: champData.name,
        title: champData.title
      };
      Champion.create(champ, function(err, data) {
        if(err) console.error(err);
      });
    });
  }).on('error', function(err) {
    console.error(err);
  });
}
