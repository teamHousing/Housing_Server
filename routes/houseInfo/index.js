const express = require('express')
const router = express.Router()
const authUtil = require('../../middlewares/authUtil')
const houseInfoController = require('../../controller/houseInfoController')

router.get('/',authUtil.checkToken,houseInfoController.getHouseInformation)//우리집정보가져오기
router.get('/unit',authUtil.onlyOwner,houseInfoController.getUnit)//호수 가져오기(집주인)
router.get('/:id/notice',authUtil.checkToken,houseInfoController.getNoticeDetail)//우리집 공지사항 상세보기
router.post('/:house_info_id/notice',authUtil.onlyOwner,houseInfoController.setNotice)//공지사항 작성

module.exports=router