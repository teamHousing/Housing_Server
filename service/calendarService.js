const {Notice, Issue, User} = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const moment = require('moment')

module.exports = {
  getScheduleList: async(select_year, select_month) => {
    // 선택월 기준 이전달과 다음달포함 총 3개월 공지사항
    const noticeList = await Notice.findAll({
      attributes:['id', 'notice_year','notice_month','notice_day', 'notice_title', 'notice_time'],
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
      attributes:['id', 'user_id','category', 'solution_method', 'promise_year','promise_month','promise_day', 'issue_title', 'issue_contents', 'promise_time'],
      where:{
        progress: 1,
        [Op.or]:[
          {[Op.and]:[{promise_year: `${select_month - 1 == 0 ? select_year - 1 : select_year}`},{promise_month: `${select_month - 1 == 0 ? 12 : select_month - 1}`}]},
          {[Op.and]:[{promise_year: `${select_year}`},{promise_month: `${select_month}`}]},
          {[Op.and]:[{promise_year: `${select_month + 1 == 13 ? select_year + 1 : select_year}`},{promise_month: `${select_month + 1 == 13 ? 1 : select_month + 1}`}]},
        ]
      }
    });
    
    const convertNoticeList = []
    noticeList.map((v,i)=>{
      const convertNotice = {}
      convertNotice.isNotice = 1
      convertNotice.id = v.id
      convertNotice.category = null
      convertNotice.solution_method = null
      convertNotice.year= v.notice_year
      convertNotice.month = v.notice_month
      convertNotice.day = v.notice_day
      convertNotice.time = null
      convertNotice.title = v.notice_title
      convertNotice.contents = null
      convertNoticeList[i]=convertNotice
    })

    const convertIssueList = []
    issueList.map((v,i)=>{
      const convertIssue = {}
      convertIssue.isNotice = 0
      convertIssue.id = v.id
      convertIssue.category = v.category
      convertIssue.solution_method = v.solution_method
      convertIssue.year= v.promise_year
      convertIssue.month = v.promise_month
      convertIssue.day = v.promise_day
      convertIssue.time = v.promise_time
      convertIssue.title = v.issue_title
      convertIssue.contents = v.issue_contents
      convertIssueList[i]=convertIssue
    })


    console.log(noticeList, issueList);
    return {
      notice: convertNoticeList,
      issue: convertIssueList,
    };
  },
  getNoticeOne: async(notice_id) => {
    const noticeObject = {};
    const noticeDate = await Notice.findOne({
      attributes:['notice_year', 'notice_month', 'notice_day', 'notice_time'],
      where:{
        id: `${notice_id}`,
      },
    });
    const noticeDateString = noticeDate.notice_year.toString() + '.' + noticeDate.notice_month.toString() + '.' + noticeDate.notice_day.toString() + ' ' + noticeDate.notice_time.toString();
    console.log(noticeDateString);
    const noticeOne = await Notice.findOne({
      attributes:['notice_title', 'notice_contents'],
      where:{
        id: `${notice_id}`,
      },
    });
    noticeObject.noticeDetail = noticeOne;
    noticeObject.noticeDate = noticeDateString;
    console.log(noticeObject);
    return noticeObject;
  },
  getIssueOne: async(issue_id) => {
    const issueObject = {}
    const issueDate = await Issue.findOne({
      attributes:['category','promise_year', 'promise_month', 'promise_day', 'promise_time'],
      where:{
        id: `${issue_id}`,
      },
    });
    const issueDateString = issueDate.promise_year.toString() + '.' + issueDate.promise_month.toString() + '.' + issueDate.promise_day.toString() + ' ' + issueDate.promise_time.toString();
    const issueOne = await Issue.findOne({
      attributes:['user_id', 'solution_method','issue_title', 'issue_contents'],
      where:{
        id: `${issue_id}`,
      },
    });
    issueObject.issueDetail = issueOne;
    issueObject.issueDate = issueDateString;
    console.log(issueOne.user_id);
    issueObject.issueUnit = (await User.findOne({
      attributes: ['unit'],
      where: {
        id: `${issueOne.user_id}`,
      },
    })).unit;
  
    console.log(issueObject);
    return issueObject;
  },
}