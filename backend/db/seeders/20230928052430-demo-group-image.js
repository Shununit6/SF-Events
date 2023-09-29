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
        preview: true,
        groupId: 1
      },
      {
        url: 'imageurlTwo',
        preview: false,
        groupId: 2
      },
      {
        url: 'imageurlThree',
        preview: true,
        groupId: 3
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
