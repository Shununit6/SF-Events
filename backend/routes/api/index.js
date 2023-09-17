const router = require('express').Router();
// const groupsRouter = require('./groups.js');

// router.use('/groups', groupsRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
