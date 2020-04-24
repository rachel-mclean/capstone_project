
exports.up = function(knex) {
  return knex.schema.createTable('skills_users', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('users.id');
    table.integer('skill_id').notNullable().references('skills.id');
    table.enu('skill_type', ['existing', 'desired'], { useNative: true, enumName: 'skill_t' });
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.unique(['user_id', 'skill_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('skills_users');
};
