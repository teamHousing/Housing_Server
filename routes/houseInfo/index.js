const express = require('express')
const router = express.Router()
const authUtil = require('../../middlewares/authUtil')
const houseInfoController = require('../../controller/houseInfoController')

router.get('/',authUtil.checkToken,houseInfoController.getHouseInformation)//우리집정보가져오기(자취생)
router.get('/unit',authUtil.checkToken,houseInfoController.getUnit)//호수 가져오기(집주인)
router.get('/:id/notice',authUtil.checkToken,houseInfoController.getNoticeDetail)//우리집 공지사항 상세보기(자취생)
router.post('/notice',authUtil.checkToken,houseInfoController.setNotice)//공지사항 작성

module.exports=router