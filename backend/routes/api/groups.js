const router = require('express').Router();

const { Group, sequelize, GroupImage, User, Venue, Event, Membership} = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { DATE } = require('sequelize');
const validateGroup = [
    check('name').exists({ checkFalsy: true }).isLength({ min: 1, max: 60 })
        .withMessage('Name must be 60 characters or less'),
    check('about').exists({ checkFalsy: true }).isLength({ min: 50 })
        .withMessage('About must be 50 characters or more'),
    check('type').exists({ checkFalsy: true }).isIn(['Online', 'In person'])
        .withMessage("Type must be 'Online' or 'In person'"),
    check('private').exists({ checkFalsy: true }).isBoolean()
        .withMessage('Private must be a boolean'),
    check('city').exists({ checkFalsy: true }).isLength({ min: 1 })
        .withMessage('City is required'),
    check('state').exists({ checkFalsy: true }).isLength({ min: 1 })
        .withMessage('State is required'),
    handleValidationErrors
];

const validateVenue = [
    check('address').exists({ checkFalsy: true }).isLength({ min: 1 })
        .withMessage('Street address is required'),
    check('city').exists({ checkFalsy: true }).isLength({ min: 1 })
        .withMessage('City is required'),
    check('state').exists({ checkFalsy: true }).isLength({ min: 1 })
        .withMessage('State is required'),
    check('lat').exists({ checkFalsy: true }).isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid'),
    check('lng').exists({ checkFalsy: true }).isFloat({ min: -180, max: 180 })
        .withMessage('Longitude is not valid'),
    handleValidationErrors
];

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

    const Groups = await Group.findAll(
        {
            include: {
                model: User,
                as: "members",
                attributes: [],
                through: {attributes: [],},
            },
            attributes: {
                include: ['id', 'organizerId', 'name', 'about', 'type', 'private', 'city', 'state', 'previewImage', 'createdAt', 'updatedAt',
                    [sequelize.fn('COUNT', sequelize.col('members.id')), 'numMembers']],
            },
            raw: true,
            group: "members.id",
        }
    );

    return res.json({ Groups });
});

router.get("/current", requireAuth, async (req, res) => {
    const Groups = await Group.findAll({
        include: {
            model: User,
            as: "members",
            attributes: [],
            through: {attributes: [],},
        },
        attributes: {
            include: ['id', 'organizerId', 'name', 'about', 'type', 'private', 'city', 'state', 'previewImage', 'createdAt', 'updatedAt',
                [sequelize.fn('COUNT', sequelize.col('members.id')), 'numMembers']],
        },
        raw: true,
        group: "members.id",
        where: {
            organizerId: req.user.id,
        },
    });
    return res.json({ Groups });
});

router.get("/:groupId", async (req, res, next) => {
    const groupId = req.params.groupId;
    const group = await Group.findOne({
        include: {
            model: User,
            as: "members",
            attributes: [],
            through: {attributes: [],},
        },
        attributes: {
            exclude: ['previewImage'],
            include: ['id', 'organizerId', 'name', 'about', 'type', 'private', 'city', 'state', 'createdAt', 'updatedAt',
                [sequelize.fn('COUNT', sequelize.col('members.id')), 'numMembers']],
        },
        raw: true,
        group: "members.id",
		where: {
			id: groupId,
		},
	});
    const GroupImages = await GroupImage.findAll({
        include: {
            model: Group,
            attributes: [],
        },
        attributes: {
            exclude: ['groupId', 'createdAt', 'updatedAt'],
            include: ['id', 'url', 'preview'],
        },
        raw: true,
        group: "GroupImage.id",
		where: {
            groupId: groupId,
		},
	});
    const Venues = await Venue.findAll({
        include: {
            model: Group,
            attributes: [],
        },
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
            include: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng'],
        },
        raw: true,
        group: "Venue.id",
		where: {
            groupId: groupId,
		},
	});
    const Organizer = await User.findOne({
        attributes: {
            exclude: [ 'email', 'username', 'hashedPassword', 'createdAt', 'updatedAt'],
            include: ['id', 'firstName', 'lastName',],
        },
		where: {
            id: groupId,
		},
	});
    if(group.length === 0){
        const err = new Error("Group couldn't be found");
        err.title = "Couldn't find a Group with the specified id";
        err.status = 404;
        return next(err);
    }
    const {id, organizerId, name, about, type, private, city, state, createdAt, updatedAt, numMembers} = group;
    const getGroupById = {
        id: id,
        organizerId: organizerId,
        name: name,
        about: about,
        type: type,
        private: private,
        city: city,
        state: state,
        createdAt: createdAt,
        updatedAt: updatedAt,
        numMembers: numMembers,
        GroupImages,
        Organizer,
        Venues,
    }
	return res.json(getGroupById);
});

// Require proper authorization: Group must belong to the current user
router.put("/:groupId", validateGroup, requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const groupId = req.params.groupId;
    const {name, about, type, private, city, state } = req.body;
    const group = await Group.findOne({
        attributes: {
            exclude: ['previewImage'],},
        where: {
        id: groupId,
    }});
    if(!group){
        const err = new Error("Group couldn't be found");
        err.title = "Group couldn't be found";
        err.status = 404;
        return next(err);
    }
    if(group.organizerId !== userId){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    }
    await group.update(
        { name: name, about: about, type: type, private: private, city: city, state: state }
    );
    return res.json(group);
});

router.get("/:groupId/events", async (req, res, next) => {
    const groupId = req.params.groupId;
    const Events = await Event.findAll({
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
        where: { groupId: groupId }
    });
    if(Events.length === 0){
        const err = new Error("Group couldn't be found");
        err.title = "Group couldn't be found";
        err.status = 404;
        return next(err);
    }
    return res.json({Events});
});

router.post("/",  validateGroup, requireAuth, async (req, res) => {
    const organizerId = req.user.id;
    const { name, about, type, private, city, state } = req.body;
    const group = await Group.create({ organizerId, name, about, type, private, city, state });
    const safeGroup = {
        id: group.id,
        organizerId: group.organizerId,
        name: group.name,
        about: group.about,
        type: group.type,
        private: group.private,
        city: group.city,
        state: group.state,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt
    };
    return res.status(201).json(
        safeGroup
    );
});
// * Require Authentication: Current User must be the organizer of the group or
// a member of the group with a status of "co-host"
router.post("/:groupId/venues", validateVenue, requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const groupId = req.params.groupId;
    const {address, city, state, lat, lng } = req.body;
    const group = await Group.findOne({ where: { id: groupId, }});
    if(!group){
        const err = new Error("Group couldn't be found");
        err.title = "Group couldn't be found";
        err.status = 404;
        return next(err);
    }
    const cohost = await Group.findAll({
        include: {
            model: User,
            as: "members",
            attributes: [],
            through: {attributes: {
                include: ['userId', 'groupId', 'status']
            },
            where: { status: "co-host" }
            },
        },
        attributes: [],
        where: { id: groupId },
    });
    const organizerId = group.organizerId;
    if(organizerId !== userId && cohost.length === 0){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    }
    const venue = await Venue.create({ groupId, address, city, state, lat, lng });
    const safeVenue = {
        id: venue.id,
        groupId: venue.groupId,
        address: venue.address,
        city: venue.city,
        state: venue.state,
        lat: venue.lat,
        lng: venue.lng,
    };
    return res.json(
        safeVenue
    );
});

// Require Authorization: Current User must be the organizer of the group or
// a member of the group with a status of "co-host"
router.post("/:groupId/events", requireAuth, validateEvent, async (req, res, next) => {
    const groupId = req.params.groupId;
    const group = await Group.findOne({
			where: {
				id: groupId,
			},
		});
    if(!group){
        const err = new Error("Group couldn't be found");
        err.title = "Group couldn't be found";
        err.status = 404;
        return next(err);
    }
    const userId = req.user.id;
    if(group.organizerId !== userId){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    }
    const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
    const event = await Event.create({ groupId, venueId, name, type, capacity, price, description, startDate, endDate });
    const safeEvent = {
        id: event.id,
        groupId: event.groupId,
        venueId: event.venueId,
        name: event.name,
        type: event.type,
        capacity: event.capacity,
        price: event.price,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate
    };
    return res.json(safeEvent);
});

router.post("/:groupId/membership", requireAuth, async (req, res, next) => {
    const groupId = req.params.groupId;
    const userId = req.user.id;
    const group = await Group.findOne({
        where: {
            id: groupId,
        },
    });
    if(!group){
        const err = new Error("Group couldn't be found");
        err.title = "Group couldn't be found";
        err.status = 404;
        return next(err);
    }
    const membership = await Membership.findOne({
        where: {
            userId: userId,
        }
    })
    if(membership && membership.status === "pending"){
        const err = new Error("Membership has already been requested");
        err.title = "Membership has already been requested";
        err.status = 400;
        return next(err);
    }
    if(membership && membership.status === "member"){
        const err = new Error("User is already a member of the group");
        err.title = "User is already a member of the group";
        err.status = 400;
        return next(err);
    }
    const status = "pending";
    const member = await Membership.create({ userId, groupId, status,});
    const safeMember = {
        memberId: member.userId,
        status: member.status,
    };
	return res.json(safeMember);
})

// Require proper authorization:
// To change the status from "pending" to "member":
// Current User must already be the organizer or have a membership to the group with the status of "co-host"
// To change the status from "member" to "co-host":
// Current User must already be the organizer
router.put("/:groupId/membership", requireAuth, async (req, res, next) => {
    const cuserId = req.user.id;
    const groupId = req.params.groupId;
    const { memberId, status } = req.body;
    // console.log(memberId, status);
    const group = await Group.findOne({
        where: {
            organizerId: cuserId,
            id: groupId,
        }
    });
    if(!group){
        const err = new Error("Group couldn't be found");
        err.status = 404;
        err.title = "Group couldn't be found";
        return next(err);
    }
    const cohost = await Membership.findOne({
        where: {
            userId: cuserId,
            groupId: groupId,
            status: "co-host",
        }
    })
    const memberUser = await User.findOne({
        where: {
            id: memberId,
        }
    })
    if(!memberUser){
        const err = new Error("Validations Error");
        err.status = 400;
        err.title = 'Validations Error';
        err.errors = { memberId: "User couldn't be found" };
        return next(err);
    }
    const member = await Membership.findOne({
        where: {
            userId: memberId,
            groupId: groupId,
        }
    })
    if(!member){
        const err = new Error("Membership between the user and the group does not exist");
        err.status = 404;
        err.title = 'membership does not exist';
        return next(err);
    }
    const memberStatus = member.status;
    if(!group && !cohost){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    }
    if(group || co-host && status === "member" && memberStatus === "pending"){
        const userId = memberId;
        const updatemember = await Membership.create({ userId, groupId, status,});
        const safeMember = {
            id: updatemember.id,
            groupId: updatemember.groupId,
            memberId: updatemember.userId,
            status: updatemember.status,
        };
	    return res.json(safeMember);
    }
    if(group && status === "co-host" && memberStatus === "member"){
        const userId = memberId;
        const updatemember = await Membership.create({ userId, groupId, status,});
        const safeMember = {
            id: updatemember.id,
            groupId: updatemember.groupId,
            memberId: updatemember.userId,
            status: updatemember.status,
        };
	    return res.json(safeMember);
    }
    // console.log(member.status);
    if(status === "pending"){
        const err = new Error("Validations Error");
        err.status = 400;
        err.title = 'Validations Error';
        err.errors = {status : "Cannot change a membership status to pending"};
        return next(err);
    }
})

// Require proper authorization: Current User must be the organizer for the group
router.post("/:groupId/images", requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const groupId = req.params.groupId;
    const group = await Group.findOne({
			where: {
				id: groupId,
			},
		});
    if(!group){
        const err = new Error("Group couldn't be found");
        err.title = "Group couldn't be found";
        err.status = 404;
        return next(err);
    }
    if(group.organizerId !== userId){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    }
    const { url, preview } = req.body;
    const groupimage = await GroupImage.create({ groupId, url, preview });
    const safeGroupImage = {
        id: groupimage.id,
        url: groupimage.url,
        preview: groupimage.preview,
    };
	return res.json(safeGroupImage);
});



module.exports = router;
