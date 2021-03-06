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
    getCommunicationList: async (id,type,unit) => {
        console.log(id, type, unit)
        const time = moment().format("YYYY-MM-DD HH:mm")
        const issueList = {}
        const convert_unit = JSON.parse(unit)
        var incompleteLength
        var completeLength
        var incompleteList
        var completeList
        const house_info_id = (await User.findByPk(id)).house_info_id
        if(type==0 && convert_unit==-1){
            console.log('집주인 전체리스트')
            incompleteList = await Issue.findAll({
                where: {
                    progress: {
                        [Op.lt]: 2
                    },
                    house_info_id:house_info_id
                },
                order:[['updatedAt','DESC']],
                attributes: ['id', 'issue_title', 'issue_contents', 'progress','category']
            })
            completeList = await Issue.findAll({
                where: {
                    progress: 2,
                    house_info_id:house_info_id,
                },
                order:[['updatedAt','DESC']],
                attributes: ['id', 'issue_title', 'issue_contents', 'progress','category']
            })
            issueList.unit=`전체 호수`
        }else if(type==0 && convert_unit>0){
            console.log(`집주인 ${unit}호 문의사항`)
            console.log('unit:',Number(unit))
            const user = await User.findOne({where:{house_info_id:house_info_id,unit:Number(unit)}})
            console.log('user:',user)
            if(user===null){
                console.log('hi')
                return []
            }
            const user_id=user.id
            console.log(user_id)
            incompleteList = await Issue.findAll({
                where: {
                    user_id:user_id,
                    progress: {
                        [Op.lt]: 2
                    }
                },
                order:[['updatedAt','DESC']],
                attributes: ['id', 'issue_title', 'issue_contents', 'progress','category']
            })
            completeList = await Issue.findAll({
                where: {
                    user_id:user_id,
                    progress: 2
                },
                order:[['updatedAt','DESC']],
                attributes: ['id', 'issue_title', 'issue_contents', 'progress','category']
            })
            issueList.unit=`${unit}호`
        }
        else if(type==1){
            console.log('자취생 전체 문의사항')
            incompleteList = await Issue.findAll({
                where: {
                    user_id:id,
                    progress: {
                        [Op.lt]: 2
                    }
                },
                order:[['updatedAt','DESC']],
                attributes: ['id', 'issue_title', 'issue_contents', 'progress','category']
            })
            completeList = await Issue.findAll({
                where: {
                    user_id:id,
                    progress: 2
                },
                attributes: ['id', 'issue_title', 'issue_contents', 'progress','category']
            })
            issueList.unit=null
        }else{
            return undefined
        }
        incompleteLength = incompleteList.length
        completeLength = completeList.length
        issueList.incomplete_length = incompleteLength
        issueList.incomplete_list = incompleteList
        issueList.complete_length = completeLength
        issueList.complete_list = completeList
        return issueList
    },
    getDetailCommunication: async (id, type) => {
        const issueDetail = await Issue.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'category', 'issue_title', 'issue_contents', 'progress', 'requested_term', 'issue_img', 'promise_option','promise_year','promise_month','promise_day','promise_time','solution_method','confirmation_promise_option'],
            include: [{
                model: Reply,
                attributes: ['id', `${convertStatus(type)}`]
            }]
        })
        if(type == 0){
            issueDetail.Replies[0].dataValues.user_status=null
        }else{
            issueDetail.Replies[0].dataValues.owner_status=null
        }
        console.log('리플테스트!:',issueDetail.Replies[0])
        return issueDetail
    },
    setIssueImage:async(id,issue_img)=>{
        const newIssue = await Issue.create({
            issue_img
        })
        console.log('id:',newIssue)
        const user = await User.findByPk(id)
        await user.addIssue(newIssue)
        const reply = await Reply.create()
        await newIssue.addReply(reply)
        const house = await HouseInfo.findByPk(user.house_info_id)
        await house.addIssue(newIssue)
        return {"issue_id":newIssue.id}
    },
    setIssue: async (id,{
        is_promise,
        category,
        issue_title,
        issue_contents,
        requested_term,
        promise_option
    }) => {
        // const addIssue = await Issue.create({
        //     category,
        //     issue_title,
        //     issue_contents,
        //     requested_term,
        //     promise_option,
        //     issue_img,
        //     progress: 0,
        //     is_promise: is_promise
        // })
        const addIssue = await Issue.update({
            category,
            issue_title,
            issue_contents,
            requested_term,
            promise_option,
            progress: 0,
            is_promise: is_promise
        },{where:{id:id}})
        console.log('Issue!!!',addIssue)
        return addIssue
    },
    setPromiseOption:async(id,promise_option)=>{
        const issue = await Issue.update({promise_option},{where:{id: id}})
        return issue
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
        console.log('!!!!!!!!!!!!!!!!!!!!ID:',id,'promise_option!!:',promise_option)
        try {
            const promise_date = moment(promise_option[0])
            console.log(`year: ${promise_date.year()}, month: ${promise_date.month() + 1}, day: ${promise_date.date()}, time:${promise_option[1]}, method:${promise_option[2]}`)
            const is_update_issue=await Issue.update({
                promise_year: promise_date.year(),
                promise_month: promise_date.month() + 1,
                promise_day: promise_date.date(),
                promise_time: promise_option[1],
                solution_method: promise_option[2],
                progress: 1,
                confirmation_promise_option:promise_option
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
            if(promise_option.length==0){
                //약속없는 문의사항 로직작성
                const user_status=[2]
                const is_update_reply = await Reply.update({
                    user_status
                },{
                    where:{
                        issue_id:id
                    }
                })
                console.log('약속없는 문의 문의사항 확인:!!',is_update_reply)
            }else{
                if(reply.user_status.length==1){
                    var user_status = [1,2]
                }else{
                    var user_status = [...reply.user_status, 1, 2]
                }
                //const user_status = [...reply.user_status, 1, 2]
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
    },
    deleteIssue:async(issue_id,id)=>{
        try{
            console.log(issue_id,   id)
            //const thisIssue = await Issue.findOne({where:{id:JSON.parse(issue_id),user_id:id}})
            const thisIssue = await Issue.findOne({where:{id:issue_id,user_id:id}})
            console.log('thisIssue:',thisIssue)
            if(thisIssue==null){
                return -1
            }
            const checkDelete = await Issue.destroy({where:{id:issue_id}})
            console.log('delete확인:',checkDelete)
            return checkDelete
        }catch(err){
            throw err
        }
    }
}

const convertStatus = (type) => {
    if (type == 0) return 'owner_status'
    else return 'user_status'
}