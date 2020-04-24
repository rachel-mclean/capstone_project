
exports.up = function(knex) {
  return knex.schema.table('skills', (table) => {
    table.unique('skill');
  });
};

exports.down = function(knex) {
  return knex.schema.table('skills', (table) => {
    table.dropUnique('skill');
  });
};
