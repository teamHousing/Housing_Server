const {User,HouseInfo,Notice} = require('../models')
const sequelize = require('sequelize')
const {Op} = sequelize

module.exports={
    getUnit:async(address)=>{
        const unitList = await User.findAll({where:{type:1,address:address},attributes:['id','unit','house_info_id']})
        return unitList
    },
    getHouseInformation:async(id)=>{
        const house_info_id = (await User.findByPk(id)).house_info_id
        const houseInfo = await HouseInfo.findOne({where:{id:house_info_id},attributes:{exclude:['createdAt','updatedAt']}})
        const notice = await Notice.findAll({where:{house_info_id},order:[['post_writer','DESC']],attributes:['id','notice_title','notice_contents']})
        return {houseInfo,notice}
    },
    getNoticeDetail:async(id)=>{
        const notice = await Notice.findOne({where:{id},attributes:{exclude:['createdAt','updatedAt','HouseInfoId']}})
        return notice
    },
    setNotice:async(house_info_id,notice_title,notice_contents,notice_option)=>{
        const houseInfo = await findByPk(house_info_id)
        const newNotice = await Notice.create({})
    }
}
