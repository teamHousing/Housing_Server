const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {communicationService,replyService} = require('../service')

module.exports={
    //소통하기 전체리스트(완료,미완료 구분)
    getAllIssue:async(req,res)=>{
        const {type,id} = req.decoded
        const {unit} = req.params
        try{
            const communicationList = await communicationService.getCommunicationList(id,type,unit)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'커뮤니케이션 리스트불러오기 성공',communicationList))
        }catch(err){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,'실패'))
        }
    },
    //소통하기 문의상세보기
    getDetailIssue:async(req,res)=>{
        const {id}=req.params
        const {type}=req.decoded
        try{
            const communicationDetail = await communicationService.getDetailCommunication(id,type)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'디테일이슈 불러오기 성공',communicationDetail))
        }catch(err){
            console.error(err)
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,'디테일 불러오기 실패'))
        }
    },
    //소통하기 문의 등록
    setIssue:async(req,res)=>{
        var issue_img 
        if(req.files){
            issue_img = req.files.map(files=>files.location)
        }
        const {id} = req.decoded
        const {is_promise,category,issue_title,issue_contents,requested_term,promise_option} = req.body
        console.log(`is_promise:${is_promise}, category:${category}, title:${issue_title}, contents:${issue_contents}, requested_term:${requested_term}, promise_option:${promise_option}`)
        if(is_promise&&(!issue_title||!issue_contents||!requested_term||!promise_option)){
            console.log('약속있는 문의')
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }else if(!is_promise&&(!issue_title||!issue_contents||!requested_term)){
            console.log('약속없는 문의')
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            await communicationService.setIssue(id,req.body,issue_img)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'문의 등록완료'))
        }catch(err){
            console.error(err)
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,'문의 등록 실패'))
        }
    },
    //문의한 약속옵션 리스트
    getOption:async(req,res)=>{
        const {id} = req.params
        try{
            const hopeList = await communicationService.getOptionList(id)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'약속시간 리스트 불러오기 성공',hopeList))
        }catch(err){
            console.error(err)
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,'약속시간 리스트 불러오기 실패'))
        }
    },
    //문의사항 확인
    promiseConfirmation:async(req,res)=>{
        const {id} = req.params//issue_id
        const {promise_option} = req.body
        try{
            await communicationService.promise_confirmation(id,promise_option)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'약속확정 성공'))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,'약속확정 실패'))
        }
    },
    //문의한 약속시간 수정요청
    reqModifyPromiseOption:async(req,res)=>{
        const {id} = req.params
        try{
            await replyService.reqModifyPromiseOption(id)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'약속일정 수정요청하기 성공'))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,'약속일정 수정요청하기 실패'))
        }
    },
    //약속시간 수정
    modifyPromiseOption:async(req,res)=>{
        const {id} = req.params
        const {promise_option} = req.body
        try{
            await communicationService.modifyPromiseOption(id,promise_option)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,'약속 수정하기 성공'))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,"약속 수정하기 실패"))
        }
    },
    //문의사항 해결완료
    completePromise:async(req,res)=>{
        const {id} = req.params
        try{
            await replyService.completePromise(id)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,"문의 해결완료"))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,"문의 해결완료 실패"))
        }
    }
}