'use strict';
const { Venue } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Venue.bulkCreate([
      {
        groupId: 1,
        address: 'Golden Gate Park, 501 Stanyan St',
        city: 'San Francisco',
        state: 'CA',
        lat: 37.769421,
        lng: -122.486214,
      },
      {
        groupId: 2,
        address: 'Union Square, 333 Post St',
        city: 'San Francisco',
        state: 'CA',
        lat: 37.787979,
        lng: -122.407516,
      },
      {
        groupId: 3,
        address: 'Fort Mason, 2 Marina Blvd Landmark Building C, Suite 260',
        city: 'San Francisco',
        state: 'CA',
        lat: 37.806786,
        lng: -122.431419,
      }
    ], { validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Venues';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      state: {[Op.in]: ['CA']}
    }, {});
  }
};
