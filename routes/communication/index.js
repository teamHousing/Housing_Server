const express = require('express')
const router = express.Router()
const communicationController = require('../../controller/communicationController')
const upload = require('../../modules/multer')
const authUtil = require('../../middlewares/authUtil')

router.get('/',authUtil.checkToken,communicationController.getAllIssue)//전체리스트
router.get('/:id',authUtil.checkToken,communicationController.getDetailIssue)//문의 상세보기
router.post('/',authUtil.checkToken,upload.array('issue_img',5),communicationController.setIssue)//문의작성
router.get('/:id/promise-option',authUtil.checkToken,communicationController.getOption)//문의 약속시간 리스트
router.post('/:id/promise',authUtil.checkToken,communicationController.promise_confirmation)//약속 확정


module.exports=router