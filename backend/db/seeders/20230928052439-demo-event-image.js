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
        url: 'https://fastly.picsum.photos/id/305/4928/3264.jpg?hmac=s2FLjeAIyYH0CZl3xuyOShFAtL8yEGiYk31URLDxQCI',
        preview: true,
        eventId: 1
      },
      {
        url: 'https://fastly.picsum.photos/id/392/5000/3333.jpg?hmac=vCaGuB6rQAiaofdQHatQL4DHgkyR2l-Ms9GWAL63CBQ',
        preview: false,
        eventId: 2
      },
      {
        url: 'https://fastly.picsum.photos/id/431/5000/3334.jpg?hmac=T2rL_gBDyJYpcr1Xm8Kv7L6bhwvmZS8nKT5w3ok58kA',
        preview: true,
        eventId: 3
      }
    ], { validate:true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      url: {[Op.in]: ['https://fastly.picsum.photos/id/305/4928/3264.jpg?hmac=s2FLjeAIyYH0CZl3xuyOShFAtL8yEGiYk31URLDxQCI',
      'https://fastly.picsum.photos/id/392/5000/3333.jpg?hmac=vCaGuB6rQAiaofdQHatQL4DHgkyR2l-Ms9GWAL63CBQ', 'https://fastly.picsum.photos/id/431/5000/3334.jpg?hmac=T2rL_gBDyJYpcr1Xm8Kv7L6bhwvmZS8nKT5w3ok58kA']}
    }, {});
  }
};
