const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const {
    houseInfoService
} = require('../service')

module.exports = {
    getUnit: async (req, res) => {
        const {
            address
        } = req.decoded //사용자id(나중에 집주인만 사용할수 있게 validation작업할 예정)
        try {
            const unitList = await houseInfoService.getUnit(address)
            if (unitList == null) {
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, "거주하고 있는 호수가 없습니다."))
            }
            return res.status(statusCode.OK).send(util.success(statusCode.OK, "호수 불러오기 성공", unitList))
        } catch (err) {
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, "호수 불러오기 실패"))
        }
    },
    getHouseInformation:async(req,res)=>{
        const {id} = req.decoded
        try{
            const houseInfo= await houseInfoService.getHouseInformation(id)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,"집정보 불러오기 성공",houseInfo))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,"집정보 불러오기 실패"))
        }
    },
    getNoticeDetail:async(req,res)=>{
        const {id} = req.params//notice pk
        try{
            const notice = await houseInfoService.getNoticeDetail(id)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,"공지사항 상세보기 성공",notice))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,"공지사항 상세보기 실패"))
        }
    },
    setNotice:async(req,res)=>{
        const {notice_title,notice_contents,} = req.body
        try{
            await houseInfoService.setNotice()
            return res.status(statusCode.OK).send(util.success(statusCode.OK,"공지사항 작성 성공"))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,"공지사항 작성하기 실패"))
        }
    }
}