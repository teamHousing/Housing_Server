const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { authenticationService } = require('../service');

module.exports = {
  setAuthenticationNumber: async (req, res) => {
    const {id, address} = req.decoded;
    const {building, unit} = req.body;
    if(!id || !address || !building || !unit){
      console.log('필요한 값이 없습니다.');
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE)); 
    }
    try{
      const authentication_number = await authenticationService.createAuthenticationNumber(id, address, building, unit);
      return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.CREATE_AUTHENTICATION_NUMBER_SUCCESS, {'authentication_number': authentication_number}));
    } catch(err){
      console.error(err);
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.CREATE_AUTHENTICATION_NUMBER_FAIL));
    }
  }
}