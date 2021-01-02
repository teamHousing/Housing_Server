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
            console.error(err)
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,'디테일 불러오기 실패'))
        }
    },
    //소통하기 문의 등록
    setIssue:async(req,res)=>{
        const issue_img = req.files.map(files=>files.location)
        const {is_promise,category,title,contents,requested_term,solution_method,promise_date,promise_time_hope,promise_option} = req.body
        console.log(`is_promise:${is_promise},category:${category},title:${title},contents:${contents},requested_term:${requested_term},solution_method:${solution_method},promise_date:${promise_date},promise_time_hope:${promise_time_hope},promise_option:${promise_option}`)
        if(JSON.parse(is_promise)&&!category||!title||!contents||!requested_term||!solution_method||!promise_date||!promise_time_hope||!promise_option){
            console.log('약속있는 문의')
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }else if(!JSON.parse(is_promise)&&!category||!title||!contents||!requested_term){
            console.log('약속없는 문의')
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            await communicationService.setIssue(req.body,issue_img)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'등록완료'))
        }catch(err){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,'문의 등록 실패'))
        }
    },
    //문의한 약속시간 리스트
    getTimeHope:async(req,res)=>{
        const {id} = req.params
        try{
            const hopeList = await communicationService.getHopeList(id)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'약속시간 리스트 불러오기 성공',hopeList))
        }catch(err){
            console.error(err)
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,'약속시간 리스트 불러오기 실패'))
        }
    },
    promise_confirmation:async(req,res)=>{
        const {id} = req.params
        const {promise_time_solution} = req.body
        try{
            await communicationService.promise_confirmation(id,promise_time_solution)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'약속확정 성공'))
        }catch(err){
            console.error(err)
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,'약속확정 실패'))
        }
    },

}