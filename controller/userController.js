const util = require('../modules/util')
const responseMessage = require('../modules/responseMessage')
const statusCode = require('../modules/statusCode')
const jwt = require('../modules/jwt')
const {userService} = require('../service')
const authentication = require('../models/authentication')

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
            return res.status(statusCode.OK).send(util.success(statusCode.OK,responseMessage.SIGN_IN_SUCCESS,user))
        }catch(err){
            console.error(err)
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR,responseMessage.SIGN_IN_FAIL))
        }
    },
    registration: async (req,res) => {
        const {type} = req.params;
        // type : 0 : 집주인
        if (type == 0){
            const {user_name, age, email, password} = req.body;
            if(!user_name || !age || !email || !password){
                console.log('필요한 값이 없습니다.');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
            }
            try{
                const alreadyEmail = await userService.emailCheck(email);
                if(alreadyEmail){
                    console.log('이미 존재하는 ID 입니다.');
                    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
                }
                const {address, building} = req.body;
                if(!address || !building){
                    console.log('필요한 값이 없습니다.');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
                }
                // const house_info = await userService.set_house_info(user_name)
                const user = await userService.registration(type, user_name, age, email, password, address, building);
                console.log('user:',user)
                const token = await jwt.login(user)
                res.cookie('user_token',token.accessToken)
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_CREATE_SUCCESS));
            } catch (err){
                console.error(err);
                return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
            }
        } else {
            const {authentication_number} = req.body;
            try{
                const addressInformation = await userService.authentication_number_check(authentication_number);
                //const addressInformation = await userService.getAddressInformation(authentication_number);
                const {user_name, age, email, password} = req.body;
                if(!user_name || !age || !email || !password){
                    console.log('필요한 값이 없습니다.');
                    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
                }
                const alreadyEmail = await userService.emailCheck(email);
                    if(alreadyEmail){
                        console.log('이미 존재하는 ID 입니다.');
                        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
                    }
                const user = await userService.registration(type, user_name, age, email, password, addressInformation.address, addressInformation.building, addressInformation.unit);
                user.address = addressInformation.address;
                user.building = addressInformation.building;
                user.unit = addressInformation.unit;
                const token = await jwt.login(user)
                res.cookie('user_token',token.accessToken)
                return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS));

            } catch (err){
                console.log(err);
                return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
            }
        }
    }
}