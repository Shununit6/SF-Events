const router = require('express').Router();

const { Group, GroupImage, Membership } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const imageId = req.params.imageId;
    const groupimage = await GroupImage.findOne({ where: { id: imageId,	},});
    if(!groupimage){
        const err = new Error("Group Image couldn't be found");
        err.title = "Group Image couldn't be found";
        err.status = 404;
        return next(err);
    }
    const userId = req.user.id;
    const groupId = groupimage.groupId;
    const organizer = await Group.findOne({ where: { id: groupId, organizerId: userId},});
    const cohost = await Membership.findOne({ where: { groupId: groupId, userId: userId, status: "co-host"}, });
    if(!organizer && !cohost){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    }
    await groupimage.destroy();
    const deletedGroupImage = await GroupImage.findOne({ where: {id: imageId,},});
    if(!deletedGroupImage){
        return res.json({
            "message": "Successfully deleted"
          });
    }
})

module.exports = router;
