'use strict';
const router = require('express').Router();
module.exports = router;

// router.use('/members', require('./members'));
router.use('/users', require('./users'));
router.use('/forms', require('./forms'));
router.use('/forum', require('./forum'));
router.use('/slack', require('./slack'));
// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});