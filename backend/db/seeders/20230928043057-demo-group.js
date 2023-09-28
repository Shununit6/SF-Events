'use strict';
const { Group } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Group.bulkCreate([
      {
        name: 'groupOne',
        about: 'aboutOne',
        type: 'typeOne',
        private: true,
        city: 'San Jose',
        state: 'CA',
        previewImage: 'previewOne'
      },
      {
        name: 'groupTwo',
        about: 'aboutTwo',
        type: 'typeTwo',
        private: false,
        city: 'San Francisco',
        state: 'CA',
        previewImage: 'previewTwo'
      },
      {
        name: 'groupThree',
        about: 'aboutThree',
        type: 'typeThree',
        private: true,
        city: 'Oakland',
        state: 'CA',
        previewImage: 'previewThree'
      }
    ], { validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {[Op.in]: ['groupOne', 'groupTwo', 'groupThree']}
    }, {});
  }
};
