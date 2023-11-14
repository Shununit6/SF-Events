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
        url: 'https://fastly.picsum.photos/id/192/2352/2352.jpg?hmac=jN5UExysObV7_BrOYLdxoDKzm_c_lRM6QkaInKT_1Go',
        preview: false,
        groupId: 1
      },
      {
        url: 'https://cdn.shopify.com/s/files/1/3026/6974/files/happy-alpacas-landscape_1024x1024.jpg',
        preview: true,
        groupId: 1
      },
      {
        url: 'https://cdn.shopify.com/s/files/1/3026/6974/files/hdr-landscape-colorful_1024x1024.jpg',
        preview: true,
        groupId: 2
      },
      {
        url: 'https://cdn.shopify.com/s/files/1/3026/6974/files/sunbeams-forest-landscape-river-water_1024x1024.jpg',
        preview: true,
        groupId: 3
      }
    ],{ validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'GroupImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: {[Op.in]: ['https://cdn.shopify.com/s/files/1/3026/6974/files/happy-alpacas-landscape_1024x1024.jpg',
      'https://cdn.shopify.com/s/files/1/3026/6974/files/hdr-landscape-colorful_1024x1024.jpg',
      'https://cdn.shopify.com/s/files/1/3026/6974/files/sunbeams-forest-landscape-river-water_1024x1024.jpg',
      'https://fastly.picsum.photos/id/192/2352/2352.jpg?hmac=jN5UExysObV7_BrOYLdxoDKzm_c_lRM6QkaInKT_1Go',
    ]}
    }, {});
  }
};
