const {Notice, Issue} = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const moment = require('moment')

module.exports = {
  getScheduleList: async(select_year, select_month) => {
    // 선택월 기준 이전달과 다음달포함 총 3개월 공지사항
    const noticeList = await Notice.findAll({
      attributes:['notice_year','notice_month','notice_day', 'notice_title', 'notice_time'],
      where:{
        [Op.or]:[
          {[Op.and]:[{notice_year: `${select_month - 1 == 0 ? select_year - 1 : select_year}`},{notice_month: `${select_month - 1 == 0 ? 12 : select_month - 1}`}]},
          {[Op.and]:[{notice_year: `${select_year}`},{notice_month: `${select_month}`}]},
          {[Op.and]:[{notice_year: `${select_month + 1 == 13 ? select_year + 1 : select_year}`},{notice_month: `${select_month + 1 == 13 ? 1 : select_month + 1}`}]},
        ]
      },
    });
    // 선택월 기준 이전달과 다음달포함 총 3개월 약속 일정
    const issueList = await Issue.findAll({
      attributes:['promise_year','promise_month','promise_day', 'issue_title', 'issue_contents', 'promise_time'],
      where:{
        progress: 1,
        [Op.or]:[
          {[Op.and]:[{promise_year: `${select_month - 1 == 0 ? select_year - 1 : select_year}`},{promise_month: `${select_month - 1 == 0 ? 12 : select_month - 1}`}]},
          {[Op.and]:[{promise_year: `${select_year}`},{promise_month: `${select_month}`}]},
          {[Op.and]:[{promise_year: `${select_month + 1 == 13 ? select_year + 1 : select_year}`},{promise_month: `${select_month + 1 == 13 ? 1 : select_month + 1}`}]},
        ]
      }
    });

    console.log(noticeList, issueList);
    return [noticeList, issueList];
  },
  
}