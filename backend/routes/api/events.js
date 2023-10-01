const router = require('express').Router();

const { Event, sequelize, User, Group, Venue, EventImage} = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

router.get('/', async (req, res) => {
    const Events = await Event.findAll(
        {
            include: [
                {
                    model: Group,
                    attributes: {
                        exclude: ['organizerId', 'about', 'type', 'private','previewImage', 'createdAt', 'updatedAt'],
                        include: ['id', 'name', 'city', 'state',]
                    },
                },
                {
                    model: Venue,
                    attributes: {
                        exclude: ['groupId', 'address', 'lat', 'lng', 'createdAt', 'updatedAt'],
                        include: ['id', 'city', 'state',]
                    },
                },
                {
                    model: User,
                    as: "attendees",
                    attributes: [],
                    through: {attributes: [],},
                },

            ],
            attributes: {
                exclude: ['description','capacity','price', 'createdAt', 'updatedAt'],
                include: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate', 'endDate', 'previewImage',
                [sequelize.fn('COUNT', sequelize.col('attendees.id')), 'numAttending']
                ]
            },
            group: "Event.id",
        }
    );
    return res.json({Events});
});

// router.post("/:eventId/images", requireAuth, async (req, res, next) => {
    // console.log(req.params.eventId);

    // const event = await Event.findAll({
	// 		where: {
	// 			id: req.params.eventId,
	// 		},
	// 	});
    // if(event.length === 0){
    //     const err = new Error("Event couldn't be found");
    //     err.title = "Event couldn't be found";
    //     err.status = 404;
    //     return next(err);
    // }
    // const { url, preview } = req.body;
    // const eventimage = await EventImage.create({ eventId, url, preview });
    // const safeEventImage = {
    //     id: eventimage.id,
    //     url: eventimage.url,
    //     preview: eventimage.preview,
    // };
// 	return res.json(event);
// });

module.exports = router;
