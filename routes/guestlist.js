var express = require('express');
var router = express.Router();

var Guestlist = require('../models/guestlist');

/* GET guestlist home page. */
router.get('/', function(req, res, next) {
  res.render('inside/guestlist', { title: 'Create & manage your own guestlists here' });
});

router.get('/mylists', function(req, res, next) {
  Guestlist.find({ owner: req.user._id }, function(err, list) {
    if (err) { return next(err); }
    res.json(list);
  });
})

router.post('/create', function(req, res, next) {
  var guestlist = new Guestlist();
  guestlist.name = req.body.name;
  guestlist.date = req.body.date;
  guestlist.owner = req.user._id;

  Guestlist.findOne({ name: req.body.name, date: req.body.date }, function(err, existingGuestlist){
    if (existingGuestlist){
      req.flash('errors', { msg: 'Guestlist with that name and date already exists.' });
      return res.redirect('/signup');
    }

    guestlist.save(function(err){
      if (err) { return next(err); }
      console.log('Successfully saved');
      res.json(guestlist);
    });
  });
});

router.get('/:id', function(req, res, next) {
  Guestlist.findOne({ _id: req.params.id }, function(err, guestlist) {
    res.render('inside/single-guestlist', { title: guestlist.name, guestlist: guestlist });
  });
});

module.exports = router;
