const {Issue} = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op
const QueryTypes = sequelize.QueryTypes
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
        const issueDetail = await Issue.findOne({where:{id:id},attributes:['id','category','title','contents','progress','requested_term','solution_method','issue_img','promise_time_hope']})
        return issueDetail
    },
    setIssue:async({is_promise,category,title,contents,requested_term,solution_method,promise_date,promise_time_hope,promise_option},issue_img)=>{
        console.log(solution_method)
        const addIssue = await Issue.create({category,title,contents,requested_term,solution_method,promise_date,promise_time_hope,promise_option,issue_img,progress:0,is_promise:JSON.parse(is_promise)})
        console.log(addIssue)
    },
    getHopeList:async(id)=>{
        const hopeList = await Issue.findOne({where:{id:id},attributes:['id','promise_time_hope']})
        return hopeList
    },
    promise_confirmation:async(id,promise_time_solution)=>{
        console.log(promise_time_solution)
        try{
            const confirmation = await Issue.update({promise_time_solution:promise_time_solution},{where:{id:id}})
            console.log(confirmation)
        }catch(err){
            console.log(err)
        }
        // const test = await Issue.update({promise_time_hope:promise_time_solution},{where:{id:id}})
        //const confirmation = await Issue.update({promise_time_solution:promise_time_solution},{where:{id:id}})
        // const query = `UPDATE Issue SET promise_time_solution=${promise_time_solution} WHERE id =${id}`
        // const confirmation = await sequelize.query(query,{type:QueryTypes.UPDATE})
        //console.log(confirmation)
    }
}