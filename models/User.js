let { Model, snakeCaseMappers } = require('objection');
let Password = require('objection-password')();

class User extends Password(Model) {
  static get tableName() {
    return 'users';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'username', 'password'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
        existing_skills: { type: 'string'},
        desired_skills: { type: 'string'}
      },
    };
  }
}

module.exports = User;
