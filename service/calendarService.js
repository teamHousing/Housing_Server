const {Notice} = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const moment = require('moment')

module.exports = {
  getScheduleList: async(select_date) => {
    console.log('test',select_date)
    const convert_date = moment(select_date).format('YYYY-MM-DD')
    console.log(convert_date)
    const noticeList = await Notice.findAll({

      where:{
        notice_date:{
          // [Op.gte]: new Date("2021-%month-01"),
          // [Op.lt]: new Date("2021-%(month+1)-01")
          [Op.between]:[`${convert_date},${convert_date}`]
        }
      },
      attributes:['notice_title', 'notice_time'],
    });
    console.log(noticeList);
    return noticeList
  },
  getScheduleDetail: async(day) => {

  }
}