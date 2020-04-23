'use strict';

var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let handlebars = require('express-handlebars');
var hbs = require('handlebars');
var cookieSession = require('cookie-session');
let moment = require('moment');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = app.get('env');
}

// A helper to generate directory paths relative to the
// project root directory,
app.root = (...args) => path.join(__dirname, ...args);

// Helper functions to check whether we're in the production
// or development environment.
app.inProduction = () => app.get('env') === 'production';
app.inDevelopment = () => app.get('env') === 'development';

if (process.env.EXPRESS_SESSION_SECRET) {
  app.set('session-secret', process.env.EXPRESS_SESSION_SECRET);
} else {
  app.set('session-secret', 'this-is-a-bad-secret');
}

// Tell Express to look in views/ to find our view templates
// and to use the Handlebars (hbs) to render them.
app.set('views', app.root('views'));
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'layout'
}));

// Put static files like stylesheets in public/
app.use(express.static(app.root('public')));

// Use a different log format for development vs. production
if (app.inDevelopment()) {
  app.use(logger('dev'));
} else {
  app.use(logger('combined'));
}

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let sessionHandler = cookieSession({
  name: 'session',
  secret: app.get('session-secret'),
});

app.use(sessionHandler);

// Knex is a module used to generate SQL queries
// See http://knexjs.org/
let Knex = require('knex');

// Objection is a module used to represent and manipuldate
// data from a SQL database using JavaScript. It uses connect
// to generate the appropriate SQL queries.
// See https://vincit.github.io/objection.js/
let { Model } = require('objection');

// Tell Knex how to connect to our database
// See config/database.js
let dbConfig = require(app.root('knexfile'));
let knex = Knex(dbConfig[process.env.NODE_ENV]);
Model.knex(knex);

let loadUser = require('./loadUser');
app.use(loadUser);


hbs.registerHelper('formatTimestamp', function(timestamp) {
  return moment(timestamp).format('MMMM Do YYYY');
});

// var hbs = handlebars.create({
//   helpers: {
//     formatTimestamp: function () { return moment(timestampe).format('MMM Do YYYY')}
//   }
// })

app.use(express.json());

app.use('/', indexRouter);


// If no route handled the request then generate an
// HTTP 404 Not Found error
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
