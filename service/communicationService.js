const {
    Issue,
    User,
    Reply,
    HouseInfo
} = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op
const moment = require('moment')

module.exports = {
    getCommunicationList: async () => {
        const time = moment().format("YYYY-MM-DD HH:mm")
        const issueList = {}
        const completeList = await Issue.findAll({
            where: {
                progress: {
                    [Op.lt]: 2
                }
            },
            attributes: ['id', 'issue_title', 'issue_contents', 'progress']
        })
        const incompleteList = await Issue.findAll({
            where: {
                progress: 2
            },
            attributes: ['id', 'issue_title', 'issue_contents', 'progress']
        })
        const completeLength = completeList.length
        const incompleteLength = incompleteList.length
        issueList.completeLength = completeLength
        issueList.completeList = completeList
        issueList.incompleteLength = incompleteLength
        issueList.incompleteList = incompleteList
        return issueList
    },
    getDetailCommunication: async (id, type) => {
        const issueDetail = await Issue.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'category', 'issue_title', 'issue_contents', 'progress', 'requested_term', 'solution_method', 'issue_img', 'promise_option'],
            include: [{
                model: Reply,
                attributes: ['id', `${convertStatus(type)}`]
            }]
        })
        return issueDetail
    },
    setIssue: async (id, {
        is_promise,
        category,
        issue_title,
        issue_contents,
        requested_term,
        promise_option
    }, issue_img) => {
        const addIssue = await Issue.create({
            category,
            issue_title,
            issue_contents,
            requested_term,
            promise_option,
            issue_img,
            progress: 0,
            is_promise: JSON.parse(is_promise)
        })
        const user = await User.findByPk(id)
        await user.addIssue(addIssue)
        const reply = await Reply.create()
        await addIssue.addReply(reply)
        const house = await HouseInfo.findByPk(user.house_info_id)
        await house.addIssue(addIssue)
    },
    getOptionList: async (id) => {
        const hopeList = await Issue.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'promise_option']
        })
        return hopeList
    },
    promise_confirmation: async (id, promise_option) => {
        try {
            const promise_date = moment(promise_option[0])
            console.log(`year: ${promise_date.year()}, month: ${promise_date.month() + 1}, day: ${promise_date.date()}, time:${promise_option[1]}, method:${promise_option[2]}`)
            const is_update_issue=await Issue.update({
                promise_year: promise_date.year(),
                promise_month: promise_date.month() + 1,
                promise_day: promise_date.date(),
                promise_time: promise_option[1],
                solution_method: promise_option[2],
                progress: 1
            }, {
                where: {
                    id: id
                }
            })
            console.log('is_update_issue:',is_update_issue)
            const reply = await Reply.findOne({where:{
                issue_id: id}
            })
            console.log('current user_status:',reply.user_status)
            console.log('current owner_status:',reply.owner_status)
            const user_status = [...reply.user_status, 1, 2]
            const owner_status = [...reply.owner_status, 1]
            const is_update_reply =await Reply.update({
                user_status,
                owner_status
            }, {
                where: {
                    issue_id: id
                }
            })
            console.log('is_update_reply:',is_update_reply)
            return {
                confirmation_promise_option: [promise_option[0], promise_option[1], promise_option[2]]
            }
        } catch (err) {
            throw err
        }
    },
    modifyPromiseOption:async(id,promise_option)=>{
        try{
            await Issue.update({promise_option},{where:{id:id}})
            const reply = await Reply.findOne({where:{issue_id:id}})
            const owner_status = [...reply.owner_status,3]
            await Reply.update({owner_status},{where:{id:reply.id}})
        }catch(err){
            throw err
        }
    }
}

const convertStatus = (type) => {
    if (type == 0) return 'owner_status'
    else return 'user_status'
}