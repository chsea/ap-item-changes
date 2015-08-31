var mongoose = require('mongoose');
var Promise = require('bluebird');
var https = require('https');
var fs = require('fs');
var request = require('request');
var models = require('./../models/index');
var Item = models.Item;
var Champion = models.Champion;

Champion.find().exec().then(function(champions) {
  champions.forEach(function(champion){
    request("http://ddragon.leagueoflegends.com/cdn/5.2.1/img/champion/"+ champion.name + ".png").pipe(fs.createWriteStream("../public/images/champions/" + champion.id + ".png"));
  });
});

// Item.find().exec().then(function(items) {
//   items.forEach(function(item){
//     request("http://ddragon.leagueoflegends.com/cdn/5.2.1/img/item/"+ item.id + ".png").pipe(fs.createWriteStream("../public/images/items/" + item.id + ".png"));
//   });
// });
