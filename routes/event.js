var express = require('express');
var router = express.Router();
var Guestlist = require('../models/guestlist');

router.get('/:id/live', function(req, res, next) {
  Guestlist.findOne({ _id: req.params.id }, function(err, list) {
    if (err) { return next(err); }
    res.render('event/event', { title: 'Guestlist', gid: req.params.id, name: list.name });
  });
});

module.exports = router;
