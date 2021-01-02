const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const jwt = require('../modules/jwt')
const {userService} = require('../service')

module.exports={
    login:async(req,res)=>{
        const {email,password} = req.body
        if(!email||!password){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE))
        }
        try{
            const user = await userService.login(email,password)
            if(user==null){
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.MISS_MATCH))
            }
            const token = await jwt.login(user)
            res.cookie('user_token',token.accessToken)
            console.log(token)
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SIGN_IN_SUCCESS))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.SIGN_IN_FAIL))
        }
    }
}