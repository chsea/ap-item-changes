var express = require('express');
var router = express.Router();
var models = require('./../models/');
var Item = models.Item;
var Champion = models.Champion;

router.get('/', function(req, res, next) {
  res.render('champions', {title: 'Most Played Champions'});
})

router.get('/all', function(req, res, next) {
  Champion.find().exec().then(function(champions) {
    var sortBy = req.query.sort;
    champions.sort(function(a,b) {
      if (sortBy === 'pre') return b.percentPlayedPre - a.percentPlayedPre;
      else if(sortBy ==='post') return b.percentPlayedPost - a.percentPlayedPost;
      else if(sortBy === 'alpha') return a.name - b.name;
      else if(sortBy === 'difference') return (Math.abs(b.percentPlayedPost - b.percentPlayedPre) - Math.abs(a.percentPlayedPost - a.percentPlayedPre));
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

    var difference = champions.map(function(champion) {
      return champion.percentPlayedPost - champion.percentPlayedPost;
    });

    res.json({name: name, percentPlayedPre: percentPlayedPre, percentPlayedPost: percentPlayedPost, difference: difference});
  });
});

router.get('/:champion', function(req, res, next) {
  var champName = req.params.champion;

  Champion.findOne({name: champName}).exec().then(function(champ) {
    res.json({name: champ.name, title: champ.title});
  });
});

module.exports = router;
