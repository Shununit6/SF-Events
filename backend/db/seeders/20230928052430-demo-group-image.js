'use strict';
const { GroupImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await GroupImage.bulkCreate([
      {
        url: 'imageurlOne',
        preview: true
      },
      {
        url: 'imageurlTwo',
        preview: false
      },
      {
        url: 'imageurlThree',
        preview: true
      }
    ],{ validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'GroupImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: {[Op.in]: ['imageurlOne', 'imageurlTwo', 'imageurlThree']}
    }, {});
  }
};
