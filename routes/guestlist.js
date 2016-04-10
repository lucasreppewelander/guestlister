var express = require('express');
var router = express.Router();

var Guestlist = require('../models/guestlist');

/* GET guestlist home page. */
router.get('/', function(req, res, next) {
  res.render('inside/guestlist', { title: 'Create & manage your own guestlists here' });
});

router.get('/:id', function(req, res, next) {
  Guestlist.findOne({ _id: req.params.id }, function(err, guestlist) {
    res.render('inside/single-guestlist', { title: guestlist.name, guestlist: guestlist });
  });
});

module.exports = router;
