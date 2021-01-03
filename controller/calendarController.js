const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { calendarService } = require('../service');

module.exports = {
  // 스케쥴 === 공지사항 + 약속
  // 캘린더 선택(월) 스케쥴 보여주기
  getMonthSchedule: async (req, res) => {
    const {select_year, select_month} = req.body
    try{
      const scheduleList = await calendarService.getScheduleList(select_year, select_month);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, '스케쥴 리스트 불러오기 성공', scheduleList));
    } catch (err) {
      console.error(err)
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, '스케쥴 리스트 불러오기 실패'));
    }
  },
  getDetailNotice: async (req, res) => {
    const {notice_id} = req.body;
    try{
      const noticeDetail = await calendarService.getNoticeOne(notice_id);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, '공지사항 상세보기 성공', noticeDetail));
    } catch(err){
      console.error(err);
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, '공지사항 상세보기 실패'));
    }
  },
  getDetailIssue: async (req, res) => {
    const {issue_id} = req.body;
    try{
      const issueDetail = await calendarService.getIssueOne(issue_id);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, '약속일정 상세보기 성공', issueDetail));
    } catch(err){
      console.error(err);
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, '약속일정 상세보기 실패'));
    }
  }
}
