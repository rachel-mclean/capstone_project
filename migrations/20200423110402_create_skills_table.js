
exports.up = function(knex) {
  return knex.schema.createTable('skills', (table) => {
    table.increments('id').primary();
    table.text('skill').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('skills');
};
