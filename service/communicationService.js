const {Issue,User,Reply,HouseInfo} = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op
const moment = require('moment')

module.exports={
    getCommunicationList:async()=>{
        const time = moment().format("YYYY-MM-DD HH:mm")
        const issueList = {}
        const completeList = await Issue.findAll({where:{progress:{[Op.lt]:2}},attributes:['id','issue_title','issue_contents','progress']})
        const incompleteList = await Issue.findAll({where:{progress:2},attributes:['id','issue_title','issue_contents','progress']})
        const completeLength = completeList.length
        const incompleteLength = incompleteList.length
        issueList.completeLength=completeLength
        issueList.completeList=completeList
        issueList.incompleteLength=incompleteLength
        issueList.incompleteList=incompleteList
        return issueList
    },
    getDetailCommunication:async(id)=>{
        const issueDetail = await Issue.findOne({where:{id:id},attributes:['id','category','issue_title','issue_contents','progress','requested_term','solution_method','issue_img','promise_option'],include:[{model:Reply,attributes:['']}]})
        return issueDetail
    },
    setIssue:async(id,{is_promise,category,issue_title,issue_contents,requested_term,solution_method,promise_option},issue_img)=>{
        const addIssue = await Issue.create({category,issue_title,issue_contents,requested_term,solution_method,promise_option,issue_img,progress:0,is_promise:JSON.parse(is_promise)})
        const user = await User.findByPk(id)
        await user.addIssue(addIssue)
        const reply = await Reply.create()
        await addIssue.addReply(reply)
        const house = await HouseInfo.findByPk(user.house_info_id)
        await house.addIssue(addIssue) 
    },
    getOptionList:async(id)=>{
        const hopeList = await Issue.findOne({where:{id:id},attributes:['id','promise_option']})
        return hopeList
    },
    promise_confirmation:async(id,promise_time_solution)=>{
        console.log(promise_time_solution)
        const confirmation = await Issue.update({promise_time_solution, progress:1},{where:{id:id}})
        return confirmation
    }
}