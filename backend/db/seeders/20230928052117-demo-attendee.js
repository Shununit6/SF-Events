'use strict';
const { Attendance } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Attendance.bulkCreate([
      {
        userId: 1,
        eventId: 1,
        status: 'attending'
      },
      {
        userId: 2,
        eventId: 2,
        status: 'waitlist'
      },
      {
        userId: 3,
        eventId: 3,
        status: 'pending'
      }
    ],{ validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Attendances';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      status: {[Op.in]: ['attending', 'waitlist', 'pending']}
    }, {});
  }
};
