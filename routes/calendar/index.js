const express = require('express');
const router = express.Router();
const calendarController = require('../../controller/calendarController');

router.post('/month', calendarController.getMonthSchedule);
router.get('/:month/:day', calendarController.getDaySchedule);
module.exports=router