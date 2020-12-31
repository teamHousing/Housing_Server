const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {communicationService} = require('../service')

module.exports={
    //소통하기 전체리스트(완료,미완료 구분)
    getAllIssue:async(req,res)=>{
        try{
            const communicationList = await communicationService.getCommunicationList()
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'커뮤니케이션 리스트불러오기 성공',communicationList))
        }catch(err){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,'실패'))
        }
    },
    //소통하기 문의상세보기
    getDetailIssue:async(req,res)=>{
        const {id}=req.params
        try{
            const communicationDetail = await communicationService.getDetailCommunication(id)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'디테일이슈 불러오기 성공',communicationDetail))
        }catch(err){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,'디테일 불러오기 실패'))
        }
    },
    //소통하기 문의 등록
    setIssue:async(req,res)=>{
        const issue_img = req.files.map(files=>files.location)
        const {is_promise,category,title,contents,requested_term,promise_solution,promise_date,promise_time_hope,promise_option} = req.body
        if(!category||!title||!contents||!requested_term||!promise_solution||!promise_date||!promise_time_hope||!promise_option){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        //is_promise : true 약속이 필요한 문의/ false 약속이 필요없는 문의
        try{
            await communicationService.setIssue(req.body,issue_img)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'등록완료'))
        }catch(err){

        }
    }
}