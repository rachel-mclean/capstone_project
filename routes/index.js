let Router = require('express-promise-router');
let User = require('../models/User');

let router = new Router();

// GET /
router.get('/', (request, response) => {
  if (request.user) {
    response.render('index', { user: request.user });
  } else {
    response.redirect('/sign-in');
  }
});

router.get('/sign-up', (request, response) => {
  if (request.user) {
    response.redirect('/');
  } else {
    response.render('sign-up');
  }
});

router.post('/sign-up', async (request, response) => {
  let email = request.body.email;
  let password = request.body.password;

  let user = await User.query().insert({
    email: email,
    password: password,
  });

  if (user) {
    request.session.userId = user.id;

    response.redirect('/');
  } else {
    response.render('sign-up');
  }
});

router.get('/sign-in', (request, response) => {
  if (request.user) {
    response.redirect('/');
  } else {
    response.render('sign-in');
  }
});

router.post('/sign-in', async (request, response) => {
  let email = request.body.email;
  let password = request.body.password;

  let user = await User.query().findOne({ email: email });
  let passwordValid = user && (await user.verifyPassword(password));

  if (passwordValid) {
    request.session.userId = user.id;

    response.redirect('/');
  } else {
    response.render('sign-in', { invalidLogin: true });
  }
});

router.post('/sign-out', (request, response) => {
  request.session.userId = null;

  response.redirect('/');
});

module.exports = router;
