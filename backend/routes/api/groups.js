const router = require('express').Router();

const { Group, sequelize, GroupImage, User, Venue} = require('../../db/models');

const { requireAuth } = require('../../utils/auth');


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
                include: ['id', 'organizerId', 'name', 'about', 'type', 'private', 'city', 'state', 'numMembers', 'previewImage', 'createdAt', 'updatedAt',
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
            include: ['id', 'organizerId', 'name', 'about', 'type', 'private', 'city', 'state', 'numMembers', 'previewImage', 'createdAt', 'updatedAt',
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
    const group = await Group.findAll({
        include: {
            model: User,
            as: "members",
            attributes: [],
            through: {attributes: [],},
        },
        attributes: {
            exclude: ['previewImage'],
            include: ['id', 'organizerId', 'name', 'about', 'type', 'private', 'city', 'state', 'numMembers', 'createdAt', 'updatedAt',
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
    const Organizer = await User.findAll({
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

	return res.json(Organizer);
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
        private: group.private,
        city: group.city,
        state: group.state,
    };
    return res.json(
        safeGroup
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
