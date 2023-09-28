'use strict';
const { Attendee } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Attendee.bulkCreate([
      {
        status: 'attending'
      },
      {
        status: 'waitlist'
      },
      {
        status: 'pending'
      }
    ],{ validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Attendees';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      status: {[Op.in]: ['attending', 'waitlist', 'pending']}
    }, {});
  }
};
