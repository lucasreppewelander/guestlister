var express = require('express');
var router = express.Router();

app.get('/instagram', passport.authenticate('instagram'));
app.get('/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/github', passport.authenticate('github'));
app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/twitter', passport.authenticate('twitter'));
app.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
app.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});


module.exports = router;
