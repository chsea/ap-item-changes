var express = require('express');
var router = express.Router();
var models = require('./../models/');
var Item = models.Item;
var Champion = models.Champion;

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
