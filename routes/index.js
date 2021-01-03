var express = require('express');
var router = express.Router();

router.use('/user',require('./user'))
router.use('/communication',require('./communication'))
router.use('/calendar',require('./calendar'))
router.use('/houseInfo',require('./houseInfo'))
router.use('/reply',require('./reply'))

module.exports = router;
