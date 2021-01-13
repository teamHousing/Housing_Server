const jwt = require('../modules/jwt')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const util = require('../modules/util')
const TOKEN_EXPIRED = -3
const TOKEN_INVALID = -2

const authUtil = {
    checkToken : async(req,res,next)=>{
        var token = req.headers.jwt
        if(!token){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.EMPTY_TOKEN))
        }
        const user = await jwt.verify(token)
        validationToken(user,req,res,next)
    },
    onlyTenant:async(req,res,next)=>{
        var token = req.headers.jwt
        if(!token){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.EMPTY_TOKEN))
        }
        const user = await jwt.verify(token)
        if(user.type == 0){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,"집주인은 사용할수 없습니다."))
        }
        validationToken(user,req,res,next)
    },
    onlyOwner:async(req,res,next)=>{
        var token = req.headers.jwt
        if(!token){
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST,responseMessage.EMPTY_TOKEN))
        }
        const user = await jwt.verify(token)
        if(user.type == 1){
            return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,"세입자는 사용할수 없습니다."))
        }
        validationToken(user,req,res,next)
    }
}

const validationToken = async(user,req,res,next)=>{
    if(user === TOKEN_EXPIRED){
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED,responseMessage.EXPIRED_TOKEN))
    }
    if(user === TOKEN_INVALID){
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN))
    }
    if(user.id === undefined){
        return res.status(statusCode.UNAUTHORIZED).send(util.fail(statusCode.UNAUTHORIZED, responseMessage.INVALID_TOKEN))
    }
    req.decoded=user
    next()
}

module.exports=authUtil