const express = require('express')
const router = express.Router()
const communicationController = require('../../controller/communicationController')

router.get('/',communicationController.getAllIssue)

module.exports=router