module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/the_know_how_swap_development',
    debug: true,
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost:5432/the_know_how_swap_test',
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
