const router = require('express').Router();

const { Event, sequelize, User, Group, Venue, EventImage, Membership, Attendance } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { Op } = require('sequelize');

const validateEvent = [
    check('venueId').exists({ checkFalsy: true }).isInt({})
        .withMessage('Venue does not exist'),
    check('name').exists({ checkFalsy: true }).isLength({ min: 5 })
        .withMessage('Name must be at least 5 characters'),
    check('type').exists({ checkFalsy: true }).isIn(['Online', 'In person'])
        .withMessage("Type must be Online or In person"),
    check('capacity').exists({ checkFalsy: true }).isInt({ min: 1 })
        .withMessage('Capacity must be an integer'),
    check('price').exists({ checkFalsy: true }).isFloat({ min: 0 })
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

// * page: integer, minimum: 1, maximum: 10, default: 1
    // * size: integer, minimum: 1, maximum: 20, default: 20
    // * name: string, optional
    // * type: string, optional
    // * startDate: string, optional
    // {
    //     "message": "Bad Request", // (or "Validation error" if generated by Sequelize),
    //     "errors": {
    //       "page": "Page must be greater than or equal to 1",
    //       "size": "Size must be greater than or equal to 1",
    //       "name": "Name must be a string",
    //       "type": "Type must be 'Online' or 'In Person'",
    //       "startDate": "Start date must be a valid datetime",
    //     }
    //   }
const validateQuery = [
    check('page').exists({ checkFalsy: true }).optional().isInt({min: 1})
        .withMessage("Page must be greater than or equal to 1"),
    check('size').exists({ checkFalsy: true }).optional().isInt({ min: 1})
        .withMessage("Size must be greater than or equal to 1"),
    check('name').optional().custom((name)=>{
        const number = parseInt(name);
        if (number - 1) {
            return false
        }
        return true})
        .withMessage("Name must be a string"),
    check('type').optional().isString().isIn(['"Online"', '"In person"'])
        .withMessage("Type must be Online or In person"),
    check('startDate').optional().custom((startDate)=>{
        // '"2022-09-07"'
        const date = startDate.slice(1, startDate.length-1);
        const Invalid = new Date(date);
        if(Invalid == "Invalid Date" || (Invalid < (new Date()))){
            return false
        }else{
            return true
        }
    }).withMessage("Start date must be a valid datetime"),
    handleValidationErrors
];

router.get('/', validateQuery, async (req, res) => {
    let { page, size, name, type, startDate } = req.query;

    page = !page || page > 10 ? 1 : page;
    size = !size || size > 20 ? 20 : size;

    page = parseInt(page);
    size = parseInt(size);

    const where = {};
    if(name) where.name = name.slice(1, name.length-1);
    if(type) where.type = type.slice(1, type.length-1);;
    if(startDate){
        startDate = startDate.slice(1, startDate.length-1);
        let start = startDate.slice(0, 10), mid = startDate.slice(11, 19);
        const newDate = start + "T" + mid + ".000Z";
        where.startDate = newDate;
    }

    const pagination = {};
    if(size) pagination.limit = size;
    if(page) pagination.offset = size * (page - 1);

    const events = await Event.findAll(
        {
            where,
            ...pagination,
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
                    as: "Attendees",
                    attributes: ['id'],
                    through: {attributes: [],},
                },
                // {
                //     model: sequelize.literal(
                //       `(SELECT COUNT(*) FROM Attendances WHERE Attendances.eventId = Event.id)`
                //     ),
                //     as: 'numAttending'
                // }
            ],
            attributes: {
                exclude: ['description','capacity','price', 'createdAt', 'updatedAt'],
                include: ['id', 'groupId', 'venueId', 'name', 'type', 'startDate', 'endDate', 'previewImage',
                // [sequelize.fn('COUNT', sequelize.col('Attendees.id')), 'numAttending'],
                // [
				// 	sequelize.literal(
				// 		`(SELECT COUNT(*) FROM Attendances WHERE Attendances.eventId = Event.id)`
				// 	),
				// 	"numAttending",
				// ],
                ]
            },
            // raw: true,
            // group: ['Event.id', 'Group.id', 'Venue.id', 'Attendees.id'],
        }
    );
    const returnEvents = events.map((obj)=>{
        const event = obj.toJSON();
        event.numAttending = event.Attendees.length;
        delete event.Attendees;
        return event;
    });
    return res.json({ Events: returnEvents, page});
});

router.get('/:eventId', async (req, res, next) => {
    const eventId = req.params.eventId;
    // const notFound = await Event.findByPk(eventId);
    // if(!notFound){
    //     const err = new Error("Event couldn't be found");
    //     err.title = "Event couldn't be found";
    //     err.status = 404;
    //     return next(err);
    // }
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
                    as: "Attendees",
                    attributes: [],
                    through: {attributes: [],},
                },

            ],
            attributes: {
                exclude: ['previewImage','createdAt', 'updatedAt'],
                include: ['id', 'groupId', 'venueId', 'name', 'description', 'type', 'capacity','price', 'startDate', 'endDate',
                [sequelize.fn('COUNT', sequelize.col('Attendees.id')), 'numAttending']
                ]
            },
            where: {
                id: eventId,
            },
            group: ["Event.id", "Group.id", "Venue.id", "Attendees.id", "EventImages.id"],
        });
    return res.json(event);
})

// Require Authorization: Current User must be the organizer of the group or
//  a member of the group with a status of "co-host"
router.put('/:eventId', requireAuth, validateEvent, async (req, res, next) => {
    const eventId = req.params.eventId;
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    const venue = await Venue.findOne({ where: { id: venueId }});
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
    const userId = req.user.id;
    const groupId = event.groupId;
    const cohost = await Membership.findOne({
        where: {
            userId: userId,
            groupId: groupId,
            status: "co-host",
        }
    });
    const organizer = await Group.findOne({
        where: {
            id: groupId,
            organizerId: userId,}
    });
    if(!organizer && !cohost){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    };
    await event.update(
        { venueId: venueId, name: name, type: type, capacity:capacity,
            price:price, description:description, startDate:startDate, endDate:endDate }
    );
    const returnEvent = await Event.findOne({
        group: "Event.id",
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
    const userId = req.user.id;
    const groupId = event.groupId;
    const organizer = await Group.findOne({
        where: { id: groupId,
        organizerId: userId,
        }
    });
    const aattendance = await Attendance.findOne({
        where: { eventId: eventId,
        userId: userId,
        }
    });
    const mmembership = await Membership.findOne({
        where: { groupId: groupId,
        userId: userId,
        }
    });
    if(organizer){
        const { url, preview } = req.body;
    const eventimage = await EventImage.create({ eventId, url, preview });
    if(preview === true) event.update({previewImage: url});
    const safeEventImage = {
            id: eventimage.id,
            url: eventimage.url,
            preview: eventimage.preview,
    };
    return res.json(safeEventImage);
    }
    //stranger
    if(!aattendance && !mmembership && !organizer){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    };
    // console.log("uniqueAttendance", aattendance.status , "uniqueAttendance", mmembership.status);
    if(mmembership.status === "co-host"){
        const { url, preview } = req.body;
    const eventimage = await EventImage.create({ eventId, url, preview });
    if(preview === true) event.update({previewImage: url});
    const safeEventImage = {
            id: eventimage.id,
            url: eventimage.url,
            preview: eventimage.preview,
    };
    return res.json(safeEventImage);
    }
    //pending
    if(!aattendance && mmembership.status === "pending"){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    };
    //pending && member
    if(aattendance.status === "pending" && mmembership.status === "member"){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    }
    const { url, preview } = req.body;
    const eventimage = await EventImage.create({ eventId, url, preview });
    if(preview === true) event.update({previewImage: url});
    const safeEventImage = {
            id: eventimage.id,
            url: eventimage.url,
            preview: eventimage.preview,
    };
    return res.json(safeEventImage);
});

router.get("/:eventId/attendees", async (req, res, next) => {
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
    const organizer = await Group.findOne({ where: {id: groupId, organizerId: cuserId }});
    const cohost = await Membership.findOne({ where: {userId: cuserId, groupId: groupId, status:"co-host"},});
    const allAttend = await Event.findOne({
        include: {
            model: User,
            as: "Attendees",
            attributes: {
                exclude: ['email', 'username', 'hashedPassword', 'createdAt', 'updatedAt'],
                include: ['id', 'firstName', 'lastName']},
            through: {attributes: {
                exclude: ['id', 'eventId', 'userId', 'createdAt', 'updatedAt'],
                include: ['status',]},},
            },
        attributes: [],
        where: {id: eventId},
    });
    const nopendingAttend = await Event.findOne({
        include: {
            model: User,
            as: "Attendees",
            attributes: {
                exclude: ['email', 'username', 'hashedPassword', 'createdAt', 'updatedAt'],
                include: ['id', 'firstName', 'lastName']},
            through: {attributes: {
                exclude: ['id', 'eventId', 'userId', 'createdAt', 'updatedAt'],
                include: ['status',]},
                where: {status: {[Op.not]: "pending",}},
                },
            },
        attributes: [],
        where: {id: eventId},
    });
    if(organizer || cohost){
        return res.json(allAttend);
    }else{
        return res.json(nopendingAttend);
    }
})

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
    const member = await Membership.findOne({ where: {userId: cuserId, groupId: groupId, status: "member"},});
    const cohost = await Membership.findOne({ where: {userId: cuserId, groupId: groupId, status: "co-host"},});
    // if(member.status === "pending"){
    // }
    if(!member && !cohost){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    }
    const pending = await Attendance.findOne({ where: {userId: cuserId, eventId: eventId, status: "pending"}});
    const attending = await Attendance.findOne({ where: {userId: cuserId, eventId: eventId, status: "attending"}});
    if(pending){
        const err = new Error("Attendance has already been requested");
        err.title = "Attendance has already been requested";
        err.status = 400;
        return next(err);
    }
    if(attending){
        const err = new Error("User is already an attendee of the event");
        err.title = "User is already an attendee of the event";
        err.status = 400;
        return next(err);
    }
    const status = "pending";
    const userId = cuserId;
    const attendee = await Attendance.create({ userId, eventId, status });
    const safeAttendee = {
        userId: attendee.userId,
        status: attendee.status,
    };
    return res.json(safeAttendee);
});

router.put("/:eventId/attendance", requireAuth, async (req, res, next) => {
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
    const organizer = await Group.findOne({ where: {id: groupId, organizerId: cuserId }});
    const cohost = await Membership.findOne({ where: {userId: cuserId, groupId: groupId, status: "co-host"},});
    if(!organizer && !cohost){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    }
    const { userId, status } = req.body;
    if(status === "pending"){
        const err = new Error("Cannot change an attendance status to pending");
        err.title = "Cannot change an attendance status to pending";
        err.status = 400;
        return next(err);
    }
    const attendance = await Attendance.findOne({ where: { userId: userId, eventId: eventId }});
    if(!attendance){
        const err = new Error("Attendance between the user and the event does not exist");
        err.title = "Attendance between the user and the event does not exist";
        err.status = 404;
        return next(err);
    }
    let id =attendance.userId - 1;
    await attendance.update({ status: status });
    const safeAttendee = {
        id: id,
        eventId: attendance.eventId,
        userId: attendance.userId,
        status: attendance.status,
    };
    return res.json(safeAttendee);
});

router.delete("/:eventId/attendance", requireAuth, async (req, res, next) => {
    const { userId } = req.body;
    const currentUser = req.user.id;
    const eventId = req.params.eventId;
    const event = await Event.findOne({ where: {id: eventId,},});
    if(!event){
        const err = new Error("Event couldn't be found");
        err.title = "Event couldn't be found";
        err.status = 404;
        return next(err);
    }
    const groupId = event.groupId;
    const organizer = await Group.findOne({ where: {id: groupId, organizerId: currentUser}});
    if( userId !== currentUser && !organizer){
        const err = new Error("Only the User or organizer may delete an Attendance");
        err.title = "Only the User or organizer may delete an Attendance";
        err.status = 403;
        return next(err);
    }
    const attendance = await Attendance.findOne({ where: { userId: userId, eventId: eventId }});
    if(!attendance){
        const err = new Error("Attendance does not exist for this User");
        err.title = "Attendance does not exist for this User";
        err.status = 404;
        return next(err);
    }
    await attendance.destroy();
    const deletedAttendance = await Attendance.findOne({ where: { userId: userId, eventId: eventId }});
    if(!deletedAttendance){
        return res.json({
            "message": "Successfully deleted attendance from event"
          });
    }
});

// * Require Authentication: true
// * Require Authorization: Current User must be the organizer of the group or a member of
//   the group with a status of "co-host"
router.delete("/:eventId", requireAuth, async (req, res, next) => {
    const currentUser = req.user.id;
    const eventId = req.params.eventId;
    const event = await Event.findOne({ where: {id: eventId,},});
    if(!event){
        const err = new Error("Event couldn't be found");
        err.title = "Event couldn't be found";
        err.status = 404;
        return next(err);
    }
    const groupId = event.groupId;
    const organizer = await Group.findOne({ where: {id: groupId, organizerId: currentUser}});
    const cohost = await Membership.findOne({
        where: {
            userId: currentUser,
            groupId: groupId,
            status: "co-host",
        }
    });
    if( !cohost && !organizer){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    }
    await event.destroy();
    const deletedEvent = await Event.findOne({ where: {id: eventId,},});
    if(!deletedEvent){
        return res.json({
            "message": "Successfully deleted"
          });
    }
});

module.exports = router;
