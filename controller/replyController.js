const util = require('../modules/util')
const statusCode = require('../modules/statusCode')
const responseMessage = require('../modules/responseMessage')
const {replyService} = require('../service')

module.exports={
    getReplyList:async(req,res)=>{
        const {type} = req.decoded
        const {issue_id} = req.params
        try{
            const reply = await replyService.getAllReply(type,issue_id)
            if(reply==null){
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,"해당 문의사항에 리플이 없습니다."))
            }
            return res.status(statusCode.OK).send(util.success(statusCode.OK,"리플 전체가져오기 성공",reply))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,"리플 전체가져오기 실패"))
        }
    }
}