var express = require('express');
var router = express.Router();

var Guestlist = require('../models/guestlist');

/* GET guestlist home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Create & manage your own guestlists here' });
});

router.get('/guestlist/:id', function(req, res, next) {
  
});

module.exports = router;