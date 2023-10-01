const router = require('express').Router();

const { Event, sequelize, Group, Venue} = require('../../db/models');

router.get('/', async (req, res) => {
    const Events = await Event.findAll(
        {
            include: [
                {
                model: Group,
                attributes: {
                    exclude: ['organizerId', 'about', 'type', 'private','previewImage', 'createdAt', 'updatedAt'],
                    include: ['id', 'name', 'city', 'state',]
                },},
                {
                    model: Venue,
                    attributes: {
                        exclude: ['groupId', 'address', 'lat', 'lng', 'createdAt', 'updatedAt'],
                        include: ['id', 'city', 'state',]
                    },},
            ],
            attributes: {
                exclude: ['description','capacity','price', 'createdAt', 'updatedAt'],
                include: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate', 'endDate', 'previewImage',]
            },
            group: "Event.id",
        }
    );
    return res.json({Events});
});

module.exports = router;
