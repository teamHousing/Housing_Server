const express = require('express');
const authenticationController = require('../../controller/authenticationController');
const router = express.Router()
const authUtil = require('../../middlewares/authUtil')

router.post('/number', authUtil.onlyOwner, authenticationController.setAuthenticationNumber);
router.post('/confirm', authenticationController.checkAuthenticationNumber);
module.exports=router