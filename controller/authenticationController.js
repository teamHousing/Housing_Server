const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { authenticationService } = require('../service');

module.exports = {
  setAuthenticationNumber: async (req, res) => {
    const {id, address} = req.decoded;
    const {unit} = req.body;
    if(!id || !address || !unit){
      console.log('필요한 값이 없습니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE)); 
    }
    try{
      const authentication_number = await authenticationService.createAuthenticationNumber(id, address, unit);
      return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CREATE_AUTHENTICATION_NUMBER_SUCCESS, {'authentication_number': authentication_number}));
    } catch(err){
      console.error(err);
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.CREATE_AUTHENTICATION_NUMBER_FAIL));
    }
  },
  checkAuthenticationNumber: async (req, res) => {
    const {authentication_number} = req.body;
    console.log('authentication!!!!!!',authentication_number)
    if(!authentication_number){
      console.log('필요한 값이 없습니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    }
    const alreadyAuthenticationNumber = await authenticationService.checkAuthenticationNumber(authentication_number);
    if(!alreadyAuthenticationNumber){
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.CHECK_AUTHENTICATION_NUMBER_FAIL));
    }
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CHECK_AUTHENTICATION_NUMBER_SUCCESS));
  }
}