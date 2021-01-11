const {User,HouseInfo,Notice} = require('../models')
const sequelize = require('sequelize')
const {Op} = sequelize
const moment = require('moment')

module.exports={
    getUnit:async(address)=>{
        const unitList = await User.findAll({where:{type:1,address:address},attributes:['id','unit','house_info_id']})
        return unitList
    },
    getHouseInformation:async(id)=>{
        const house_info_id = (await User.findByPk(id)).house_info_id
        const houseInfo = await HouseInfo.findOne({where:{id:house_info_id},attributes:{exclude:['createdAt','updatedAt']}})
        const notice = await Notice.findAll({where:{house_info_id},order:[['updatedAt','DESC']],attributes:['id','notice_title','notice_contents']})
        return {houseInfo,notice}
    },
    getNoticeDetail:async(id)=>{
        const notice = await Notice.findOne({where:{id},attributes:{exclude:['createdAt','updatedAt','HouseInfoId']}})
        return notice
    },
    setNotice:async(house_info_id,notice_title,notice_contents,notice_option)=>{
        const houseInfo = await HouseInfo.findByPk(house_info_id)
        await notice_option.map(async v=>{
            console.log('v:',v)
            const convert_date = moment(v.date)
            const year = convert_date.year()
            const month = convert_date.month()+1
            const date = convert_date.date()
            const newNotice = await Notice.create({notice_title,notice_contents,notice_year:year,notice_month:month,notice_day:date,notice_time:v.time})
            await houseInfo.addNotice(newNotice) 
        })
    }
}
