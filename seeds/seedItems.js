var mongoose = require('mongoose');
var Promise = require('bluebird');
var http = require('http');
var models = require('./../models/');
var Item = models.Item;

http.get('http://ddragon.leagueoflegends.com/cdn/5.11.1/data/en_US/item.json', function(res) {
  var itemData = '';
  res.on('data', function(dataChunk) {
    itemData += dataChunk;
  });

  res.on('end', function() {
    try {
      items = JSON.parse(itemData).data;
    } catch(err) {
      return;
    }
    for (var key in items) {
      var item = {
        id: key,
        name: items[key].name
      };
      console.log(item);
      Item.create(item, function(err, data) {
        if(err) console.error(err);
      });
    }
  });
}).on('error', function(err) {
  console.log(err);
});
