let Router = require('express-promise-router');
let User = require('../models/User');
let Skill = require('../models/Skill')
let SkillsUsers = require('../models/SkillsUsers')

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
  if(request.user) {
    let users = await User.query().withGraphFetched('[skills(onlyExisting) as existingSkills, skills(onlyDesired) as desiredSkills]');

    let showNavButtons = true;
    let showingProfiles = true;
    response.render('index', { users, user: request.user, showNavButtons, showingProfiles});
  }
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
  });

  if (user) {
    request.session.userId = user.id;

    let existingSkillList = existing_skills.toLowerCase().trim().split(/\s*,\s*/);
    let desiredSkillList = desired_skills.toLowerCase().trim().split(/\s*,\s*/);
    let allSkills = existingSkillList.concat(desiredSkillList);

    for (let skill of allSkills) {
      let result = await Skill.query().findOne({ skill });

      if (!result) {
        await Skill.query().insert({ skill });
      }
    }

    //add right edges
    //insert into skillsUsers

    let existingSkills = await Skill.query().where('skill', 'in', existingSkillList);
    let desiredSkills = await Skill.query().where('skill', 'in', desiredSkillList);

    await SkillsUsers.query().insert([
      ...existingSkills.map(skill => ({ user_id: user.id, skill_id: skill.id, skill_type: 'existing' })),
      ...desiredSkills.map(skill => ({ user_id: user.id, skill_id: skill.id, skill_type: 'desired' })),
    ]);

    response.redirect('/profiles');
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

    response.redirect('/profiles');
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
