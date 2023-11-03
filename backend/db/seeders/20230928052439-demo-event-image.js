'use strict';
const { EventImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await EventImage.bulkCreate([
      {
        url: 'imageurlOne',
        preview: true,
        eventId: 1
      },
      {
        url: 'imageurlTwo',
        preview: false,
        eventId: 2
      },
      {
        url: 'imageurlThree',
        preview: true,
        eventId: 3
      }
    ], { validate:true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: {[Op.in]: ['imageurlOne', 'imageurlTwo', 'imageurlThree']}
    }, {});
  }
};
