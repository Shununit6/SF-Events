const router = require('express').Router();


const { Event, EventImage, Group, Membership } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const imageId = req.params.imageId;
    const eventimage = await EventImage.findOne({ where: { id: imageId,	},});
    if(!eventimage){
        const err = new Error("Event Image couldn't be found");
        err.title = "Event Image couldn't be found";
        err.status = 404;
        return next(err);
    }
    const userId = req.user.id;
    const event = await Event.findOne({ where: {id: eventimage.eventId}});
    const groupId = event.groupId;
    const organizer = await Group.findOne({ where: { id: groupId, organizerId: userId},});
    const cohost = await Membership.findOne({ where: { groupId: groupId, userId: userId, status: "co-host"}, });
    if(!organizer && !cohost){
        const err = new Error("Forbidden");
        err.status = 403;
        err.title = 'Require proper authorization';
        return next(err);
    }
    await eventimage.destroy();
    const deletedEventImage = await EventImage.findOne({ where: {id: imageId,},});
    if(!deletedEventImage){
        return res.json({
            "message": "Successfully deleted"
          });
    }
})

module.exports = router;
