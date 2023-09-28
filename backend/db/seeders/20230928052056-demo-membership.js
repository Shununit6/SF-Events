'use strict';
const { Membership } = require('../models');

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Membership.bulkCreate([
      {
        status: 'co-host'
      },
      {
        status: 'member'
      },
      {
        status: 'pending'
      }
    ], { validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Memberships";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      status: {[Op.in]: ['co-host', 'member', 'pending']}
    }, {});
  }
};
