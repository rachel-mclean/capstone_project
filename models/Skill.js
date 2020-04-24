let { Model, snakeCaseMappers } = require('objection');

class Skill extends Model {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'skills';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'skill'
      ],
      properties: {
        id: {type: 'integer'},
        skill: {type: 'string'}
      }
    }
  }

  static get modifiers() {
    return {
      onlyExisting(query) {
        query.where('skill_type', 'existing');
      },

      onlyDesired(query) {
        query.where('skill_type', 'desired');
      },
    }
  }
}

module.exports = Skill;
