const router = require('express').Router();

const { Event, sequelize, User, Group, Venue, EventImage, Membership, Attendee } = require('../../db/models');

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
    check('endDate').custom((endDate, { req }) => {
            const startDate = req.body.startDate;
            if (startDate >= endDate) {
                return false
            }
            return true
        }).withMessage('End date is less than start date'),

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

// Require Authorization: Current User must be the organizer of the group or
//  a member of the group with a status of "co-host"
router.put('/:eventId', requireAuth, validateEvent, async (req, res, next) => {
    const eventId = req.params.eventId;
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    const venue = Venue.findOne({ where: { id: venueId }});
    if(!venue){
        const err = new Error("Venue couldn't be found");
        err.title = "Venue couldn't be found";
        err.status = 404;
        return next(err);
    }
    const event = await Event.findOne({
        where: { id: eventId, }
    });
    if(!event){
        const err = new Error("Event couldn't be found");
        err.title = "Event couldn't be found";
        err.status = 404;
        return next(err);
    }
    await event.update(
        { venueId: venueId, name: name, type: type, capacity:capacity,
            price:price, description:description, startDate:startDate, endDate:endDate }
    );
    const returnEvent = await Event.findOne({
        attributes: {
            exclude: ['previewImage', 'createdAt', 'updatedAt'],},
        where: { id: eventId, }});
    return res.json(returnEvent);
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

router.post("/:eventId/attendance", requireAuth, async (req, res, next) => {
    const cuserId = req.user.id;
    const eventId = req.params.eventId;
    const event = await Event.findOne({ where: {id: eventId,},});
    if(!event){
        const err = new Error("Event couldn't be found");
        err.title = "Event couldn't be found";
        err.status = 404;
        return next(err);
    }
    const groupId = event.groupId;
    const member = await Membership.findOne({ where: {userId: cuserId, groupId: groupId},});
    // if(member.status === "pending"){
    // }
    if(!member){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    }
    const attendance = await Attendee.findOne({ where: {userId: cuserId, eventId: eventId}});
    if(attendance && attendance.status==="pending"){
        const err = new Error("Attendance has already been requested");
        err.title = "Attendance has already been requested";
        err.status = 400;
        return next(err);
    }
    if(attendance && attendance.status==="attending"){
        const err = new Error("User is already an attendee of the event");
        err.title = "User is already an attendee of the event";
        err.status = 400;
        return next(err);
    }
    const status = "pending";
    const userId = cuserId;
    const attendee = await Attendee.create({ userId, eventId, status });
    const safeAttendee = {
        userId: attendee.userId,
        status: attendee.status,
    };
    return res.json(safeAttendee);
});
module.exports = router;
