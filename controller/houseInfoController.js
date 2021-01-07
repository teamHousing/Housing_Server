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
    }
}