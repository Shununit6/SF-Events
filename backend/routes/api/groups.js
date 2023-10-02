const router = require('express').Router();

const { Group, sequelize, GroupImage, User, Venue, Event} = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
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
    check('price').exists({ checkFalsy: true }).isDouble({ min: 0 })
        .withMessage('Price is invalid'),
    check('description').exists({ checkFalsy: true }).isLength({ min: 1 })
        .withMessage('Description is required'),
    check('startDate').exists({ checkFalsy: true }).isDate()
        .withMessage('Start date must be in the future'),
    check('endDate').exists({ checkFalsy: true }).isDate()
        .withMessage('End date is less than start date'),
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
router.post("/:groupId/events", validateEvent, requireAuth, async (req, res, next) => {
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
