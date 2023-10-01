const router = require('express').Router();

// const { Venue } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateVenue = [
    check('address').exists({ checkFalsy: true }).isLength({ min: 1 })
        .withMessage('Street address is required'),
    check('about').exists({ checkFalsy: true }).isLength({ min: 1 })
        .withMessage('City is required'),
    check('city').exists({ checkFalsy: true }).isFloat()
        .withMessage('Latitude is not valid'),
    check('state').exists({ checkFalsy: true }).isFloat()
        .withMessage('Longitude is not valid'),
    handleValidationErrors
];

// module.exports = {
//     validateVenue, router
// };
module.exports = router;
