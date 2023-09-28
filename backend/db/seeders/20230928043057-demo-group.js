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
        organizerId: 1,
        name: 'groupOne',
        about: 'aboutOne',
        type: 'typeOne',
        private: true,
        city: 'San Jose',
        state: 'CA',
        previewImage: 'previewOne'
      },
      {
        organizerId: 2,
        name: 'groupTwo',
        about: 'aboutTwo',
        type: 'typeTwo',
        private: false,
        city: 'San Francisco',
        state: 'CA',
        previewImage: 'previewTwo'
      },
      {
        organizerId: 3,
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
      organizerId: {[Op.in]: [1, 2, 3]}
    }, {});
  }
};
