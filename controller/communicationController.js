const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {communicationService} = require('../service')

module.exports={
    getAllIssue:async(req,res)=>{
        try{
            const communicationList = await communicationService.getCommunicationList()
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'커뮤니케이션 리스트불러오기 성공',communicationList))
        }catch(err){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,'실패'))
        }
    }
}