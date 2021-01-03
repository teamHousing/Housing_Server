const express = require('express')
const router = express.Router()
const communicationController = require('../../controller/communicationController')
const upload = require('../../modules/multer')
const authUtil = require('../../middlewares/authUtil')

router.get('/',authUtil.checkToken,communicationController.getAllIssue)
router.get('/:id',authUtil.checkToken,communicationController.getDetailIssue)
router.post('/',authUtil.checkToken,upload.array('issue_img',5),communicationController.setIssue)
router.get('/:id/promise-option',authUtil.checkToken,communicationController.getOption)
router.post('/:id/promise',authUtil.checkToken,communicationController.promise_confirmation)

module.exports=router