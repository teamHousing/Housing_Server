const express = require('express')
const router = express.Router()
const authUtil = require('../../middlewares/authUtil')
const userController = require('../../controller/userController')

router.post('/login',userController.login)

module.exports=router