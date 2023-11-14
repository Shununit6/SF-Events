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
        groupId: 1,
        venueId: 1,
        name: 'eventOne',
        type: 'Online',
        description: 'descriptionOne',
        capacity: 10,
        price: 18.50,
        startDate: '2024-11-02 08:00:00',
        endDate: '2024-11-04 08:00:00',
        previewImage: 'previewOne'
      },
      {
        groupId: 1,
        venueId: 1,
        name: 'eventFour',
        type: 'Online',
        description: 'descriptionOne',
        capacity: 10,
        price: 18.50,
        startDate: '2023-11-02 08:00:00',
        endDate: '2023-11-03 08:00:00',
        previewImage: 'previewTwo'
      },
      {
        groupId: 2,
        venueId: 2,
        name: 'eventTwo',
        type: 'Online',
        description: 'descriptionTwo',
        capacity: 20,
        price: 10.50,
        startDate: '2023-11-08 08:00:00',
        endDate: '2023-11-09 08:00:00',
        previewImage: 'previewTwo'
      },
      {
        groupId: 2,
        venueId: 2,
        name: 'eventFive',
        type: 'Online',
        description: 'descriptionFive',
        capacity: 20,
        price: 10.50,
        startDate: '2023-11-06 08:00:00',
        endDate: '2023-11-07 08:00:00',
        previewImage: 'previewFive'
      },
      {
        groupId: 3,
        venueId: 3,
        name: 'eventThree',
        type: 'In person',
        description: 'descriptionThree',
        capacity: 15,
        price: 5.50,
        startDate: '2023-12-20 08:00:00',
        endDate: '2023-12-22 08:00:00',
        previewImage: 'previewThree'
      },
      {
        groupId: 3,
        venueId: 3,
        name: 'eventSix',
        type: 'In person',
        description: 'descriptionSix',
        capacity: 15,
        price: 5.50,
        startDate: '2023-12-12 08:00:00',
        endDate: '2023-12-14 08:00:00',
        previewImage: 'previewSix'
      }
    ], { validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Events';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: {[Op.in]: ['eventOne', 'eventTwo', 'eventThree', 'eventFour','eventFive', 'eventSix']}
    }, {});
  }
};
