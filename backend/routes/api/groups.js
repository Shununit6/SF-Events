const router = require('express').Router();

const { Group, sequelize, Membership, User } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');


router.get('/', async (req, res) => {

    const groupId = await Group.findAll(
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
            // where: { organizerId: req.user.id},
        }
    );

    return res.json(groupId);
});

router.get("/current", async (req, res) => {

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

router.post("/:groupId/images", async (req, res) => {
    // res.json(group)
    // console.log(req.user);
    // console.log(req.user.id);
    // console.log(res);
    const group = await Group.findAll({
			where: {
				id: req.params.groupId,
			},
		});
    // console.log( req.params.groupId );
	return res.json(group);
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
