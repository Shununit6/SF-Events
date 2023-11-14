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
        url: 'https://fastly.picsum.photos/id/250/4928/3264.jpg?hmac=4oIwzXlpK4KU3wySTnATICCa4H6xwbSGifrxv7GafWU',
        preview: false,
        eventId: 1
      },
      {
        url: 'https://cdn.shopify.com/s/files/1/3026/6974/files/night-landscape-stars-water-tree_1024x1024.jpg',
        preview: true,
        eventId: 1
      },
      {
        url: 'https://cdn.shopify.com/static/sample-images/shoes.jpeg',
        preview: true,
        eventId: 2
      },
      {
        url: 'https://i.imgur.com/5zGtPJV.jpeg',
        preview: true,
        eventId: 3
      },
      {
        url: 'https://i.imgur.com/4uV6LGh.jpeg',
        preview: true,
        eventId: 4
      },
      {
        url: 'https://i.imgur.com/Kp4SAvW.jpeg',
        preview: true,
        eventId: 5
      },
      {
        url: 'https://i.imgur.com/eTaY1qP.jpeg',
        preview: true,
        eventId: 6
      }
    ], { validate:true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: {[Op.in]: ['https://cdn.shopify.com/s/files/1/3026/6974/files/night-landscape-stars-water-tree_1024x1024.jpg',
      'https://cdn.shopify.com/static/sample-images/shoes.jpeg',
      'https://i.imgur.com/5zGtPJV.jpeg',
      'https://i.imgur.com/4uV6LGh.jpeg',
      'https://i.imgur.com/Kp4SAvW.jpeg',
      'https://i.imgur.com/eTaY1qP.jpeg',
      'https://fastly.picsum.photos/id/250/4928/3264.jpg?hmac=4oIwzXlpK4KU3wySTnATICCa4H6xwbSGifrxv7GafWU',
    ]}
    }, {});
  }
};
