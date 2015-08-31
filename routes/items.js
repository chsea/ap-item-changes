var express = require('express');
var router = express.Router();
var models = require('./../models/');
var Item = models.Item;
var Champion = models.Champion;

router.get('/', function(req, res, next) {
  res.render('items/count');
});

router.get('/by-count', function(req, res, next) {
  Item.find().exec().then(function(items) {
    var sortBy = req.query.sort;
    items.sort(function(a,b) {
      if (sortBy === 'pre') return b.percentUsedPre - a.percentUsedPre;
      else if(sortBy ==='post') return b.percentUsedPost - a.percentUsedPost;
      else if(sortBy === 'difference') return (Math.abs(b.percentUsedPost - b.percentUsedPre) - Math.abs(a.percentUsedPost - a.percentUsedPre));
    });

    var name = items.map(function(item) {
      return item.name;
    });

    var percentUsedPre = items.map(function(item) {
      return item.percentUsedPre;
    });
    var percentUsedPost = items.map(function(item) {
      return item.percentUsedPost;
    });

    var difference = items.map(function(item) {
      return item.percentUsedPost - item.percentUsedPost;
    });
    res.json({name: name, percentUsedPre: percentUsedPre, percentUsedPost: percentUsedPost, difference: difference});
  });
});

router.get('/changed', function(req, res, next) {
  res.render('items/changed');
});

router.get('/changed-items', function(req, res, next) {
  Item.find({changed: true}).exec().then(function(items) {
    var data = items.map(function(item) {
      var champsPre = item.champsPre.map(function(champ) {
        return {id: champ.id, percent: champ.count / champ.champTotal};
      });
      champsPre.sort(function(a, b) {
        return b.percent - a.percent;
      });
      var champsPost = item.champsPost.map(function(champ) {
        return {id: champ.id, percent: champ.count / champ.champTotal};
      });
      champsPost.sort(function(a, b) {
        return b.percent - a.percent;
      });

      return {
        id: item.id,
        name: item.name,
        notes: item.patchNotes,
        countPre: item.countPre,
        countPost: item.countPost,
        percentUsedPre: item.percentUsedPre,
        percentUsedPost: item.percentUsedPost,
        champsPre: champsPre.slice(0, 10),
        champsPost: champsPost.slice(0, 10)
      };
    });
    res.json(data);
  });
});

router.get('/:item', function(req, res, next) {
  var item = req.params.item;
  Item.findOne({name: item}).exec().then(function(item) {
    var champsPre = item.champsPre.map(function(champ) {
      return {id: champ.id, percent: champ.count / champ.champTotal};
    });
    champsPre.sort(function(a, b) {
      return b.percent - a.percent;
    });
    var champsPost = item.champsPost.map(function(champ) {
      return {id: champ.id, percent: champ.count / champ.champTotal};
    });
    champsPost.sort(function(a, b) {
      return b.percent - a.percent;
    });

    res.json({name: item.name, id: item.id, countPre: item.countPre, countPost: item.countPost, percentUsedPre: item.percentUsedPre, percentUsedPost: item.percentUsedPost, champsPre: champsPre.slice(0, 6), champsPost: champsPost.slice(0, 6)});
  });
});

module.exports = router;
