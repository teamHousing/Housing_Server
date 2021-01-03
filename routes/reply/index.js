const express = require('express')
const router = express.Router()
const authUtil = require('../../middlewares/authUtil')
const replyController = require('../../controller/replyController')

router.get('/:issue_id',authUtil.checkToken,replyController.getReplyList)

module.exports=router