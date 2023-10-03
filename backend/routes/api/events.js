const router = require('express').Router();

const { Event, sequelize, User, Group, Venue, EventImage} = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateEvent = [
    check('venueId').exists({ checkFalsy: true }).isInt()
        .withMessage('Venue does not exist'),
    check('name').exists({ checkFalsy: true }).isLength({ min: 5 })
        .withMessage('Name must be at least 5 characters'),
    check('type').exists({ checkFalsy: true }).isIn(['Online', 'In person'])
        .withMessage("Type must be Online or In person"),
    check('capacity').exists({ checkFalsy: true }).isInt({ min: 1 })
        .withMessage('Capacity must be an integer'),
    check('price').exists({ checkFalsy: true }).isDecimal({ min: 0 })
        .withMessage('Price is invalid'),
    check('description').exists({ checkFalsy: true }).isLength({ min: 1 })
        .withMessage('Description is required'),
    check('startDate').exists({ checkFalsy: true }).isAfter(`${new Date()}`)
        .withMessage('Start date must be in the future'),
    // check('endDate').exists({ checkFalsy: true }).isAfter(`${startDate}`)
    //     .withMessage('End date is less than start date'),
    handleValidationErrors
];
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

router.get('/:eventId', async (req, res, next) => {
    const eventId = req.params.eventId;
    const event = await Event.findOne(
        {
            include: [
                {
                    model: Group,
                    attributes: {
                        exclude: ['organizerId', 'about', 'type', 'previewImage', 'createdAt', 'updatedAt'],
                        include: ['id', 'name', 'private', 'city', 'state',]
                    },
                },
                {
                    model: Venue,
                    attributes: {
                        exclude: ['groupId', 'createdAt', 'updatedAt'],
                        include: ['id', 'address', 'city', 'state','lat', 'lng',]
                    },
                },
                {
                    model: EventImage,
                    attributes: {
                        exclude: ['eventId','createdAt', 'updatedAt'],
                        include: ['id', 'url', 'preview']
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
                exclude: ['previewImage','createdAt', 'updatedAt'],
                include: ['id', 'groupId', 'venueId', 'name', 'description', 'type', 'capacity','price', 'startDate', 'endDate',
                [sequelize.fn('COUNT', sequelize.col('attendees.id')), 'numAttending']
                ]
            },
            where: {
                id: eventId,
            },
        });
    if(!event.id){
        const err = new Error("Group couldn't be found");
        err.title = "Group couldn't be found";
        err.status = 404;
        return next(err);
    }
    return res.json(event);
})

// Require proper authorization: Current User must be an attendee,
// host, or co-host of the event
router.post("/:eventId/images", requireAuth, async (req, res, next) => {
    const eventId = req.params.eventId;
    const event = await Event.findOne({
			where: {
				id: eventId,
			},
		});
    if(!event){
        const err = new Error("Event couldn't be found");
        err.title = "Event couldn't be found";
        err.status = 404;
        return next(err);
    }
    const { url, preview } = req.body;
    const eventimage = await EventImage.create({ eventId, url, preview });
    const safeEventImage = {
        id: eventimage.id,
        url: eventimage.url,
        preview: eventimage.preview,
    };
	return res.json(safeEventImage);
});

module.exports = router;
