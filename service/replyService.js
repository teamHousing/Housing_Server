const {Reply,Issue} = require('../models')

module.exports={
    getAllReply:async(type,issue_id)=>{//type으로 사용자상태를 변경할껀지 집주인상태를 변경할껀지 필터링
        if(type===0){//집주인이면 owner_status반환
            console.log('집주인 리플가져오기')
            const reply = await Reply.findOne({where:{issue_id:issue_id},attributes:['id','owner_status']})
            return reply
        }else{//학생이면 user_status반환
            console.log('학생리플 가져오기')
            const reply = await Reply.findOne({where:{issue_id:issue_id},attributes:['id','user_status']})
            return reply
        }
    },
    reqModifyPromiseOption:async(id)=>{
        try{
            const reply = await Reply.findOne({where:{issue_id:id}})
        console.log(...reply.user_status)
        const user_status = [3]
        const owner_status = [...reply.owner_status,2]
        await Reply.update({user_status,owner_status},{where:{issue_id:id}})
        }catch(err){
            throw err
        }
    },
    completePromise:async(id)=>{
        try{
            const reply = await Reply.findOne({where:{issue_id:id}})
            const user_status = [...reply.user_status,4]
            const owner_status = [...reply.owner_status,4]
            await Reply.update({user_status,owner_status},{where:{id:reply.id}})
            await Issue.update({progress:2},{where:{id:id}})

        }catch(err){
            throw err
        }
    }
}