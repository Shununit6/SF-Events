const router = require('express').Router();
const eventimagesRouter = require('./event-images.js');
const eventsRouter = require('./events.js');
const groupimagesRouter = require('./group-images.js');
const groupsRouter = require('./groups.js');
const venuesRouter = require('./venues.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/event-images', eventimagesRouter);

router.use('/events', eventsRouter);

router.use('/group-images', groupimagesRouter);

router.use('/groups', groupsRouter);

router.use('/venues', venuesRouter);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;
