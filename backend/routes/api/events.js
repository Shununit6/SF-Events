const router = require('express').Router();

const { Event, sequelize, Group, Venue} = require('../../db/models');

router.get('/', async (req, res) => {
    const events = await Event.findAll(
        {
            include: {
                model: Venue,
                attributes: {
                    exclude: ['groupId', 'address', 'lat', 'lng', 'createdAt', 'updatedAt'],
                    include: ['id', 'city', 'state',]
                },
                include: {
                model: Group,
                attributes: {
                    exclude: ['organizerId','name', 'about', 'type', 'private','previewImage', 'createdAt', 'updatedAt'],
                    include: ['id', 'city', 'state',]
                },
            },
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
                include: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate', 'endDate', 'previewImage',]
            },
            raw: true,
            group: "Event.id",
        }
    );
    return res.json(events);
});

module.exports = router;
