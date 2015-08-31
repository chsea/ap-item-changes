var express = require('express');
var router = express.Router();
var models = require('./../models/');
var Item = models.Item;
var Champion = models.Champion;

router.get('/', function(req, res, next) {
  res.render('champions/count');
});

router.get('/by-count', function(req, res, next) {
  Champion.find().exec().then(function(champions) {
    var sortBy = req.query.sort;
    champions.sort(function(a,b) {
      if (sortBy === 'pre') return b.percentPlayedPre - a.percentPlayedPre;
      else if(sortBy ==='post') return b.percentPlayedPost - a.percentPlayedPost;
      else if(sortBy === 'name') {
        return a.name - b.name;
      }
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

router.get('/damage', function(req, res, next) {
  res.render('champions/damage');
});

router.get('/by-damage', function(req, res, next) {
  Champion.find().exec().then(function(champions) {
    var sortBy = req.query.sort;
    champions.sort(function(a,b) {
      if (sortBy === 'pre-magic') return b.avgMagicDamageToChampsPre - a.avgMagicDamageToChampsPre;
      else if(sortBy ==='post-magic') return b.avgMagicDamageToChampsPost - a.avgMagicDamageToChampsPost;
      else if (sortBy === 'pre-total') return b.avgTotalDamageToChampsPre - a.avgTotalDamageToChampsPre;
      else if(sortBy === 'post-total') return b.avgTotalDamageToChampsPost - a.avgTotalDamageToChampsPost;
      else if(sortBy === 'difference-magic') return (Math.abs(b.avgMagicDamageToChampsPost - b.avgMagicDamageToChampsPre) - Math.abs(a.avgMagicDamageToChampsPost - a.avgMagicDamageToChampsPre));
      else if(sortBy === 'difference-total') return (Math.abs(b.avgMagicDamageToChampsPost - b.avgMagicDamageToChampsPre) - Math.abs(a.avgMagicDamageToChampsPost - a.avgMagicDamageToChampsPre));
    });

    var name = champions.map(function(champion) {
      return champion.name;
    });
    var avgMagicDamageToChampsPre = champions.map(function(champion) {
      return champion.avgMagicDamageToChampsPre;
    });
    var avgMagicDamageToChampsPost = champions.map(function(champion) {
      return champion.avgMagicDamageToChampsPost;
    });
    var avgTotalDamageToChampsPre = champions.map(function(champion) {
      return champion.avgTotalDamageToChampsPre;
    });
    var avgTotalDamageToChampsPost = champions.map(function(champion) {
      return champion.avgTotalDamageToChampsPost;
    });

    res.json({name: name, avgMagicDamageToChampsPre: avgMagicDamageToChampsPre, avgMagicDamageToChampsPost: avgMagicDamageToChampsPost, avgTotalDamageToChampsPre: avgTotalDamageToChampsPre, avgTotalDamageToChampsPost: avgTotalDamageToChampsPost});
  });
});

router.get('/winrate', function(req, res, next) {
  res.render('champions/winrate');
});

router.get('/by-winrate', function(req, res, next) {
  Champion.find().exec().then(function(champions) {
    var sortBy = req.query.sort;
    champions.sort(function(a,b) {
      if (sortBy === 'pre') return b.winRatePre - a.winRatePre;
      else if(sortBy ==='post') return b.winRatePost - a.winRatePost;
      else if(sortBy === 'difference') return (Math.abs(b.winRatePost - b.winRatePre) - Math.abs(a.winRatePost - a.winRatePre));
    });

    var name = champions.map(function(champion) {
      return champion.name;
    });
    var winRatePre = champions.map(function(champion) {
      return champion.winRatePre;
    });
    var winRatePost = champions.map(function(champion) {
      return champion.winRatePost;
    });

    var difference = champions.map(function(champion) {
      return champion.winRatePost - champion.winRatePre;
    });

    res.json({name: name, winRatePre: winRatePre, winRatePost: winRatePost, difference: difference});
  });
});

router.get('/kda', function(req, res, next) {
  res.render('champions/kda');

});

router.get('/by-kda', function(req, res, next) {
  Champion.find().exec().then(function(champions) {
    var sortBy = req.query.sort;
    champions.sort(function(a,b) {
      if (sortBy === 'pre') return b.avgKdaPre - a.avgKdaPre;
      else if(sortBy ==='post') return b.avgKdaPost - a.avgKdaPost;
      else if(sortBy === 'difference') return (Math.abs(b.avgKdaPost - b.avgKdaPre) - Math.abs(a.avgKdaPost - a.avgKdaPre));
    });

    var name = champions.map(function(champion) {
      return champion.name;
    });
    var avgKdaPre = champions.map(function(champion) {
      return champion.avgKdaPre;
    });
    var avgKdaPost = champions.map(function(champion) {
      return champion.avgKdaPost;
    });

    var difference = champions.map(function(champion) {
      return champion.avgKdaPost - champion.avgKdaPre;
    });

    res.json({name: name, avgKdaPre: avgKdaPre, avgKdaPost: avgKdaPost, difference: difference});
  });
});

router.get('/:champion', function(req, res, next) {
  var champName = req.params.champion;
  Champion.findOne({name: champName}).exec().then(function(champ) {
    var itemsPre = champ.itemsPre.map(function(item) {
      return {id: item.id, percent: item.count / champ.countPre};
    }).slice(0, 6);
    var itemsPost = champ.itemsPost.map(function(item) {
      return {id: item.id, percent: item.count / champ.countPost};
    }).slice(0, 6);

    res.json({name: champ.name, title: champ.title, id: champ.id, countPre: champ.countPre, countPost: champ.countPost, percentPlayedPre: champ.percentPlayedPre, percentPlayedPost: champ.percentPlayedPost, avgKillsPre: champ.avgKillsPre, avgKillsPost: champ.avgKillsPost, avgDeathsPre: champ.avgDeathsPre, avgDeathsPost: champ.avgDeathsPost, avgAssistsPre: champ.avgAssistsPre, avgAssistsPost: champ.avgAssistsPost, avgKdaPre: champ.avgKdaPre, avgKdaPost: champ.avgKdaPost, avgMagicDamageToChampsPre: champ.avgMagicDamageToChampsPre,  avgMagicDamageToChampsPost: champ.avgMagicDamageToChampsPost, avgTotalDamageToChampsPre: champ.avgTotalDamageToChampsPre, avgTotalDamageToChampsPost: champ.avgTotalDamageToChampsPost, winRatePre: champ.winRatePre, winRatePost: champ.winRatePost, itemsPre: itemsPre, itemsPost: itemsPost});
  });
});

router.get('/id/:id', function(req, res, next) {
  Champion.getName(req.params.id).then(function(name){
    res.redirect('/champions/' + name);
  });
});

module.exports = router;
