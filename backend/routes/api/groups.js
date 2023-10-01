const router = require('express').Router();

const { Group, sequelize, GroupImage, User, Venue} = require('../../db/models');

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

// const { validateVenue } = require('./venues');

router.get('/', async (req, res) => {

    const groups = await Group.findAll(
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

    return res.json(groups);
});

router.get("/current", requireAuth, async (req, res) => {
    const group = await Group.findAll({
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
    return res.json(group);
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
        err.title = "Group couldn't be found";
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

router.put("/:groupId", validateGroup, requireAuth, async (req, res, next) => {
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
    await group.update(
        { name: name, about: about, type: type, private: private, city: city, state: state }
    );
    return res.json(group);
});

router.post("/", requireAuth, async (req, res) => {
    const organizerId = req.user.id;
    const { name, about, type, private, city, state } = req.body;
    const group = await Group.create({ organizerId, name, about, type, private, city, state });
    const safeGroup = {
        id: group.id,
        organizerId: group.organizerId,
        name: group.name,
        about: group.about,
        type: group.type,
        city: group.city,
        state: group.state,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt
    };
    return res.json(
        safeGroup
    );
});
// * Require Authentication: Current User must be the organizer of the group or
// a member of the group with a status of "co-host"
router.post("/:groupId/venues", requireAuth, async (req, res, next) => {
    const groupId = req.params.groupId;
    const {address, city, state, lat, lng } = req.body;
    const group = await Group.findOne({ where: { id: groupId, }});
    if(!group){
        const err = new Error("Group couldn't be found");
        err.title = "Group couldn't be found";
        err.status = 404;
        return next(err);
    }
    const member = await Group.findOne({
        include: {
            model: User,
            as: "members",
            attributes: [],
            through: {attributes: {
                exclude: ['createdAt', 'updatedAt'],}},
        },
        attributes: {
            exclude: ['id', 'organizerId', 'name', 'about', 'type', 'private', 'city', 'state', 'previewImage', 'createdAt', 'updatedAt',
                [sequelize.fn('COUNT', sequelize.col('members.id')), 'numMembers']],
        },
        raw: true,
        group: "members.id",
        where: { id: groupId }});
        const currentUserId = req.user.id;
        const OrganizerId = group.organizerId;
        const memberStatus = member['members.Membership.status'];
        const memberGroupId = member['members.Membership.groupId'];
        const memberUserId = member['members.Membership.userId'];
    console.log(req.user.id);
    console.log(group.organizerId);
    console.log(member['members.Membership.status']);
    console.log(member['members.Membership.userId']);
    console.log(member['members.Membership.groupId']);
    return res.json(
        member
    );
});

router.post("/:groupId/images", async (req, res, next) => {
    const group = await Group.findAll({
			where: {
				id: req.params.groupId,
			},
		});
    const groupId = req.params.groupId;
    if(group.length === 0){
        const err = new Error("Group couldn't be found");
        err.title = "Group couldn't be found";
        err.status = 404;
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

// const groups = await Group.findAll({
//     attributes: [ 'id', ],
//     where,
//     include: [
//         {
//             model: Membership,
//             attributes: []
//         }
//     ],
//     attributes: {
//         include: [
//             [
//                 sequelize.fn("COUNT", sequelize.col("Membership.id")),
//                 "numMembers"
//             ]
//         ]
//     },
// });
