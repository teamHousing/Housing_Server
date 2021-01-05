const express = require('express');
const router = express.Router();
const calendarController = require('../../controller/calendarController');

router.post('/month', calendarController.getMonthSchedule);
router.post('/notice-detail', calendarController.getDetailNotice);
router.post('/issue-detail', calendarController.getDetailIssue);
module.exports=router