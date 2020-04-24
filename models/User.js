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
        // existing_skills: { type: 'string'},
        // desired_skills: { type: 'string'}
      },
    };
  }

  static get relationMappings() {
    let Skill = require('./Skill');

    return {
      skills: {
        relation: Model.ManyToManyRelation,
        modelClass: Skill,
        join: {
          from: 'users.id',
          through: {
            from: 'skills_users.user_id',
            to: 'skills_users.skill_id',
            extra: ['skill_type']
          },
          to: 'skills.id'
        }
      },
    }
  }

  // get existingSkills() {
  //   return this.skills.filter(skill => skill.skillType === 'existing');
  // }

  // get desiredSkills() {
  //   return this.skills.filter(skill => skill.skillType === 'desired');
  // }
}

module.exports = User;
