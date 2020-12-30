const {Issue} = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op
module.exports={
    getCommunicationList:async()=>{
        const issue_list = {}
        const complete_list = await Issue.findAll({where:{progress:{[Op.lt]:2}},attributes:['id','title','contents','progress']})
        const incomplete_list = await Issue.findAll({where:{progress:2},attributes:['id','title','contents','progress']})
        const complete_length = complete_list.length
        const incomplete_length = incomplete_list.length
        issue_list.complete_length=complete_length
        issue_list.complete_list=complete_list
        issue_list.incomplete_length=incomplete_length
        issue_list.incomplete_list=incomplete_list
        return issue_list
    }
}