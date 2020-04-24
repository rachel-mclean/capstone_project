
exports.up = function(knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('existing_skills');
    table.dropColumn('desired_skills');
  });
}

exports.down = function(knex) {
  return knex.schema.table('users', (table) => {
    table.string('existing_skills');
    table.string('desired_skills');
  });
}
