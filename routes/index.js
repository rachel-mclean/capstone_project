let Router = require('express-promise-router');
let User = require('../models/User');

let router = new Router();

// GET

router.get('/', function(req, res, next) {
  let showButtons = true;
  res.render('index', {showButtons});
});

router.get('/sign-in', (request, response) => {
  response.render('sign-in');
});

router.get('/sign-up', (request, response) => {
  response.render('sign-up');
});

router.get('/profiles', async (request, response) => {
  let users = await User.query();
  response.render('index', { users })
});

router.post('/sign-up', async (request, response) => {
  let email = request.body.email;
  let password = request.body.password;
  let username = request.body.username;
  let existing_skills = request.body.existing_skills;
  let desired_skills = request.body.desired_skills;

  let user = await User.query().insert({
    email: email,
    username: username,
    password: password,
    existing_skills: existing_skills,
    desired_skills: desired_skills
  });

  if (user) {
    request.session.userId = user.id;

    response.redirect('/');
  } else {
    response.render('sign-up');
  }
});

router.post('/sign-in', async (request, response) => {
  let username = request.body.username;
  let password = request.body.password;

  let user = await User.query().findOne({ username: username });
  let passwordValid = user && (await user.verifyPassword(password));

  if (passwordValid) {
    request.session.userId = user.id;

    let users = await User.query();


    response.render('index', { users })
  } else {
    response.render('sign-in', { invalidLogin: true });
  }
});

router.get('/sign-out', (request, response) => {
  let showButtons = true;
  response.render('index', {showButtons});
});

router.post('/sign-out', (request, response) => {
  request.session.userId = null;
});

module.exports = router;
