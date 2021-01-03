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
  // 캘린더 선택(일) 스케쥴 보여주기
  getDaySchedule: async (req, res) => {
    const {day} = req.params;
    try{
      const scheduleDetail = await calendarService.getScheduleDetail(date);
      return res.status(statusCode.OK).send(util.success(statusCode.OK, '선택 날짜 스케쥴 불러오기 성공', scheduleDetail));
    } catch (err) {
      console.error(err);
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, '선택 날짜 스케쥴 불러오기 실패'));
    }
  },
  
}
