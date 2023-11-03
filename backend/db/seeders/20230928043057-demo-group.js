'use strict';
const { Group } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Group.bulkCreate([
      {
        organizerId: 1,
        name: 'groupOne',
        about: 'This is the first group of this group, this tells everyone about this group',
        type: 'In person',
        private: true,
        city: 'San Jose',
        state: 'CA',
        previewImage: 'previewOne'
      },
      {
        organizerId: 2,
        name: 'groupTwo',
        about: 'This is the second group of this group, this tells everyone about this group',
        type: 'Online',
        private: false,
        city: 'San Francisco',
        state: 'CA',
        previewImage: 'previewTwo'
      },
      {
        organizerId: 3,
        name: 'groupThree',
        about: 'This is the third group of this group, this tells everyone about this group',
        type: 'In person',
        private: true,
        city: 'Oakland',
        state: 'CA',
        previewImage: 'previewThree'
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      organizerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
