const router = require('express').Router();

const { Venue } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


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

// Require Authentication: Current User must be the organizer of the group or
//  a member of the group with a status of "co-host"
router.put("/:venueId",requireAuth, validateVenue, async (req, res, next) => {
    // const userId = req.user.id;
    const venueId = req.params.venueId;
    const {address, city, state, lat, lng} = req.body;
    const venue = await Venue.findOne({
        attributes: {
            exclude: ['createdAt', 'updatedAt'],
        },
        where: {
        id: venueId,
    }});
    if(!venue){
        const err = new Error("Venue couldn't be found");
        err.title = "Venue couldn't be found";
        err.status = 404;
        return next(err);
    }
    // if(group.organizerId !== userId){
    //     const err = new Error("Forbidden");
    //     err.status = 403;
    //     err.title = 'Require proper authorization';
    //     return next(err);
    // }
    await venue.update(
        { address: address, city: city, state: state, lat: lat, lng: lng }
    );
    const updatedVenue = {
        id: venue.id,
        groupId: venue.groupId,
        address: venue.address,
        city: venue.city,
        state: venue.state,
        lat: venue.lat,
        lng: venue.lng
    }
    return res.json(updatedVenue);
});

module.exports = router;
