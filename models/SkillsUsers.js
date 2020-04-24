let { Model, snakeCaseMappers } = require('objection');

class SkillsUsers extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'skills_users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'user_id',
        'skill_id',
        'skill_type'
      ],
      properties: {
        id: {type: 'integer'},
        user_id: {type: 'integer'},
        skill_id: {type: 'integer'},
        skill_type: {type: 'string'}

      }
    }
  }
}

module.exports = SkillsUsers;
