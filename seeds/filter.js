var mongoose = require('mongoose');
var Promise = require('bluebird');
var models = require('./../models/');
var Item = models.Item;
var Champion = models.Champion;
var Participant = models.Participant;

Item.find({countPre: 0, countPost: 0}).remove().exec().then(function(items) {
  items.forEach(function(item){
    console.log(item.name, item.countPre, item.countPost);
  });
});
