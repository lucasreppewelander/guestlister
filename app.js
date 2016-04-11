var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser'),
    session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session),
    flash = require('express-flash');
var lusca = require('lusca');
var csrf = require('csurf');
var passport = require('passport');
var dotenv = require('dotenv');
var multer = require('multer');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser'),
    mongoose = require('mongoose');

dotenv.load({ path: '.env' });
var passportConfig = require('./config/passport');
var upload = multer({ dest: path.join(__dirname, 'public/uploads') });

/* routes */
var routes = require('./routes/index'),
    users = require('./routes/users'),
    guestlist = require('./routes/guestlist'),
    auth = require('./routes/auth'),
    inside = require('./routes/inside'),
    api = require('./routes/api'),
    event = require('./routes/event');

var app = express();
var server = http.Server(app);
var io = require('socket.io')(http);

mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('port', 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(csrf());
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});
app.use(function(req, res, next) {
  res.locals.user = req.user;
  res.locals.csrf = req.csrfToken();
  next();
});
app.use(function(req, res, next) {
  // After successful login, redirect back to /api, /contact or /
  if (/(api)|(contact)|(^\/$)/i.test(req.path)) {
    req.session.returnTo = req.path;
  }
  next();
});
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static('bower_components'));

app.use('/', routes);
app.use('/users', users);
app.use('/guestlist', guestlist);
app.use('/auth', auth);
app.use('/api', passportConfig.isAuthenticated, api);
app.use('/inside', passportConfig.isAuthenticated, inside);
app.use('/event', passportConfig.isAuthenticated, event);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

io.on('connection', function(socket){
  console.log('a user connected');
});

server.listen(3000);
io.listen(server);

app.use(errorHandler());

module.exports = app;