const express = require('express')
const router = express.Router()
const communicationController = require('../../controller/communicationController')
const upload = require('../../modules/multer')

router.get('/',communicationController.getAllIssue)
router.get('/:id',communicationController.getDetailIssue)
router.post('/',upload.array('issue_img',5),communicationController.setIssue)

module.exports=router