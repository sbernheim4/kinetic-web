'use strict';

const router = require('express').Router();
const DiscussionRoutes = require('./discussions.js');
module.exports = router;

router.use('/discussions', DiscussionRoutes);
