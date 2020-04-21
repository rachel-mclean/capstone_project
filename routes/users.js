var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/sign-in', async (req,res, next) => {
  res.render('sign-in');
});

router.post('/sign-in', async(req,res,next) => {
  // Authenticate user with Passport
});

router.get('/sign-up', (req,res,next) => {
  res.render('sign-up');
});

router.post('/sign-up', async(req,res,next) => {
  // Add new user to database
});

module.exports = router;
