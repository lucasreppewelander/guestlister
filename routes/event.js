var express = require('express');
var router = express.Router();

router.get('/:id/live', function(req, res, next) {
  res.render('event/event', { title: 'Guestlist', gid: req.params.id });
});

module.exports = router;
