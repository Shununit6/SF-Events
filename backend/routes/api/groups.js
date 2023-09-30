const router = require('express').Router();

const { Group, Membership } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');


router.get('/', async(req, res) => {

    const groupId = await Group.findAll(
        {
            attributes: { include: ['id'],
                          exclude: ['organizerId', 'name', 'about', 'type', 'private', 'city', 'state', 'numMembers', 'previewImage', 'createdAt', 'updatedAt'] }
                        }
    );

    let memberNum;
    memberNum = (groupId.forEach(element => {
        Membership.count({where: {groupId: element.id}})
    }));

    return res.json(groupId);
});

router.get("/current", async(req, res) => {

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
