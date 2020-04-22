exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.text('email').unique().notNullable();
    table.text('password').notNullable();
    table.text('username').notNullable();
    table.text('existing_skills');
    table.text('desired_skills');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
