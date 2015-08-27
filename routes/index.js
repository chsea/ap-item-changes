var express = require('express');
var router = express.Router();
var models = require('./../models/index2');
var Item = models.Item;
var Champion = models.Champion;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/all-champs', function(req, res, next) {
  Champion.find().exec().then(function(champions) {
    champions.sort(function(a,b) {
        return b.percentPlayedPost - a.percentPlayedPost;
    });

    var name = champions.map(function(champion) {
      return champion.name;
    });
    var percentPlayedPre = champions.map(function(champion) {
      return champion.percentPlayedPre;
    });
    var percentPlayedPost = champions.map(function(champion) {
      return champion.percentPlayedPost;
    });
    res.json({name: name, percentPlayedPre: percentPlayedPre, percentPlayedPost: percentPlayedPost});
  });
});

module.exports = router;
