const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email').exists({ checkFalsy: true }).isEmail()
        .withMessage('Invalid email'),
    check('username').exists({ checkFalsy: true }).isLength({ min: 4 })
        .withMessage('Username is required'),
    check('username').not().isEmail()
        .withMessage('Username cannot be an email.'),
    check('firstName').exists({ checkFalsy: true }).isLength({ min: 1 })
        .withMessage('First Name is required'),
    check('lastName').exists({ checkFalsy: true }).isLength({ min: 1 })
        .withMessage('Last Name is required'),
    check('password').exists({ checkFalsy: true }).isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


router.post('/', validateSignup, async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const signup = await User.signup({ email, username});
    if(signup === "email") {
        const err = new Error('User already exists');
        err.title = 'User already exists';
        err.errors = {
            email: "User with that email already exists"
        };
        err.status = 500;
        return next(err);
    }
    if(signup === "username") {
        const err = new Error('User already exists');
        err.title = 'User already exists';
        err.errors = {
            username: "User with that username already exists"
        };
        err.status = 500;
        return next(err);
    }
    const user = await User.create({ firstName, lastName, email, username, hashedPassword });
    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
    };
    await setTokenCookie(res, safeUser);
    return res.json({
        user: safeUser
    });
}
);

module.exports = router;
