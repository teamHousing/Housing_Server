const {Issue} = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op
const moment = require('moment')

module.exports={
    getCommunicationList:async()=>{
        const time = moment().format("YYYY-MM-DD HH:mm")
        console.log(time)
        console.log(typeof time)
        console.log(moment(time))
        const issueList = {}
        const completeList = await Issue.findAll({where:{progress:{[Op.lt]:2}},attributes:['id','title','contents','progress']})
        const incompleteList = await Issue.findAll({where:{progress:2},attributes:['id','title','contents','progress']})
        const completeLength = completeList.length
        const incompleteLength = incompleteList.length
        issueList.completeLength=completeLength
        issueList.completeList=completeList
        issueList.incompleteLength=incompleteLength
        issueList.incompleteList=incompleteList
        return issueList
    },
    getDetailCommunication:async(id)=>{
        const issueDetail = await Issue.findOne({where:{id:id},attributes:['id','category','title','contents','progress','requested_term','solution_method','issue_img']})
        return issueDetail
    },
    setIssue:async({is_promise,category,title,contents,requested_term,solution_method,promise_date,promise_time_hope,promise_option},issue_img)=>{
        console.log(solution_method)
        const addIssue = await Issue.create({category,title,contents,requested_term,solution_method,promise_date,promise_time_hope,promise_option,issue_img,progress:0,is_promise:JSON.parse(is_promise)})
        console.log(addIssue)
    }
}