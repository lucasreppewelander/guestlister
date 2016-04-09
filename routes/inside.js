var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('inside/main', { title: "Welcome " + req.user.username } );
});

module.exports = router;
