const express = require('express')
const router = express.Router()
const communicationController = require('../../controller/communicationController')
const upload = require('../../modules/multer')
const authUtil = require('../../middlewares/authUtil')

router.get('/:unit',authUtil.checkToken,communicationController.getAllIssue)//전체리스트
router.get('/detail/:id',authUtil.onlyTenant,communicationController.getDetailIssue)//문의 상세보기
router.post('/image',authUtil.onlyTenant,upload.array('issue_img',5),communicationController.setIssueImage)//문의작성(사진)
router.post('/:id',authUtil.onlyTenant,communicationController.setIssue)//문의작성(정보)
router.post('/:id/promise-option',authUtil.onlyTenant,communicationController.setPromiseOption)//문의작성-약속시간
router.get('/:id/promise-option',authUtil.checkToken,communicationController.getOption)//문의 약속시간 리스트
router.post('/:id/promise',authUtil.onlyOwner,communicationController.promiseConfirmation)//약속 확정

router.get('/:id/request/promise-option',authUtil.onlyOwner,communicationController.reqModifyPromiseOption)//일정수정요청(집주인)
router.put('/:id/promise-option',authUtil.onlyTenant,communicationController.modifyPromiseOption)//약속수정하기(학생)
router.get('/:id/complete/promise',authUtil.onlyTenant,communicationController.completePromise)//해결완료(학생)

module.exports=router