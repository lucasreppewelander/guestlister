var express = require('express');
var router = express.Router();
var Guestlist = require('../models/guestlist');

router.get('/list/get', function(req, res, next) {
  Guestlist.find({ owner: req.user._id }, function(err, list) {
    if (err) { return next(err); }
    res.json(list);
  });
});

router.get('/attendees/:id', function(req, res, next) {
  Guestlist.findOne({ _id: req.params.id }, function(err, list) {
    if (err) { return next(err); }
    res.json(list.attendees);
  });
});

router.post('/attendees/add', function(req, res, next) {
  Guestlist.findOneAndUpdate(
    { _id: req.body.listId },
    { '$push': { 'attendees': { 'name': req.body.name, 'email': req.body.email }}},
    { new : true },
    function(err, list) {
      if (err) next(err);
      res.json(list);
  });
});

router.post('/attendees/hasArrived', function(req, res, next) {
  Guestlist.findOneAndUpdate(
    { 'attendees._id': req.body._id },
    { '$set': { 'attendees.$.arrived': true } },
    { new : true },
    function(err, list) {
      res.json(list.attendees);
  });
});

router.post('/list/create', function(req, res, next) {
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

module.exports = router;
