const {User,HouseInfo,Notice} = require('../models')
const sequelize = require('sequelize')
const {Op} = sequelize
const moment = require('moment')

module.exports={
    getUnit:async(address)=>{
        console.log('address!:',address)
        const unitList = await User.findAll({where:{type:1,address:address},attributes:['id','unit','house_info_id']})
        console.log('unit!:',unitList)
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
        console.log('notice!',notice)
        const convertNotice={...notice.dataValues,option:[`${notice.notice_year}. ${notice.notice_month}. ${notice.notice_day}`,`${notice.notice_time}`]}
        return convertNotice
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
    },
    deleteNotice:async(notice_id,id)=>{
        console.log(notice_id,  id)
        const thisUser = await User.findOne({where:{id:id}})
        console.log('thisUser!!:',thisUser)
        const house_info_id = (thisUser).house_info_id
        console.log('house id:',house_info_id)
        const deleteCheck = await Notice.destroy({where:{id:notice_id,house_info_id:house_info_id}})
        return deleteCheck
    }
}
