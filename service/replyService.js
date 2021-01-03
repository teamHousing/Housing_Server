const {Reply} = require('../models')

module.exports={
    getAllReply:async(id,type)=>{
        const reply = await Reply.findOne({where:{user_id:id, type:type, issue_id:issue_id}})
        return reply
    }
}