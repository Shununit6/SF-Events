'use strict';
const { Event } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Event.bulkCreate([
      {
        name: 'eventOne',
        type: 'typeOne',
        description: 'descriptionOne',
        capacity: 10,
        price: 18.50,
        startDate: '12-02-2023',
        endDate: '12-10-2023',
        previewImage: 'previewOne'
      },
      {
        name: 'eventTwo',
        type: 'typeTwo',
        description: 'descriptionOne',
        capacity: 20,
        price: 10.50,
        startDate: '11-02-2023',
        endDate: '11-10-2023',
        previewImage: 'previewTwo'
      },
      {
        name: 'eventThree',
        type: 'typeThree',
        description: 'descriptionThree',
        capacity: 15,
        price: 5.50,
        startDate: '10-02-2023',
        endDate: '10-10-2023',
        previewImage: 'previewThree'
      }
    ], { validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {[Op.in]: ['eventOne', 'eventTwo', 'eventThree']}
    }, {});
  }
};
