const express = require('express');
const router = express.Router();
const calendarController = require('../../controller/calendarController');
const authUtil = require('../../middlewares/authUtil')

router.post('/schedule', authUtil.checkToken,calendarController.getSchedule);
router.post('/notice-detail', calendarController.getDetailNotice);
router.post('/issue-detail', calendarController.getDetailIssue);
module.exports=router