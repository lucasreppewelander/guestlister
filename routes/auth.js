var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/instagram', passport.authenticate('instagram'));
router.get('/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
router.get('/google', passport.authenticate('google', { scope: 'profile email' }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
router.get('/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});


module.exports = router;
