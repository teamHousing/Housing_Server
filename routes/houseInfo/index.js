const express = require('express');
const router = express.Router()
const authUtil = require('../../middlewares/authUtil')
const houseInfoController = require('../../controller/houseInfoController')

// router.get('/unit',authUtil.checkToken,houseInfoController.getUnit)//호수 가져오기(집주인)

module.exports=router