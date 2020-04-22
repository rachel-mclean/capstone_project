
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'ramclean@davidson.edu', password: 'irene123', username: 'rachel_mclean', existing_skills: 'rock climbing, french, calculus', desired_skills: 'soccer, linear algebra, spanish'},
        {id: 2, email: 'e.laura.mcl@gmail.com', password: 'laura-test', username: 'laura_m', existing_skills: 'violin, yoga, german', desired_skills: 'skateboarding, calligraphy, kickboxing'}
      ]);
    });
};
