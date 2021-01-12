const {
  User,
  Authentication,
  HouseInfo
} = require('../models')
const user = require('../models/user')
const statusCode = require('../modules/statusCode')

module.exports = {
  login: async (email, password) => {
    const user = await User.findOne({
      where: {
        email: email,
        password: password
      },
      attributes:['id','type','address','user_name']
    })
    return user
  },
  registration: async (type, user_name, age, email, password, address, building, unit) => {
    try {
      const user = await User.create({
        type,
        user_name,
        age,
        email,
        password,
        address,
        building,
        unit,
      });
      if (type == 1) {
        const houseInfoId = (await User.findOne({
          where: {
            type: 0,
            address: address
          }
        })).house_info_id
        console.log('houseInfoId:', houseInfoId)
        const houseInfo = await HouseInfo.findByPk(houseInfoId)
        console.log('houseInfo:', houseInfo)
        await houseInfo.addUser(user)
      } else {
        const newHouseInfo = await HouseInfo.create({
          profile_message:"서로를 위해 조금만 조용히~ 오놀도 행복한 하루 :)",
          profile_img:"https://sopt-27-jinho.s3.ap-northeast-2.amazonaws.com/images/origin/1609531036436.JPG",
          hope_time:["11:00","20:00"],
          response_time:"5분 이내",
          owner_name:user_name
        })
        await newHouseInfo.addUser(user)
      }

      return user
    } catch (err) {
      throw err;
    }
  },
  emailCheck: async (email) => {
    try {
      const alreadyEmail = await User.findOne({
        where: {
          email,
        }
      });
      return alreadyEmail;
    } catch (err) {
      throw err;
    }
  },
  passwordCheck: async (password, password_check) => {
    if (password == password_check) {
      return 1;
    } else {
      return 0;
    }
  },
  authentication_number_check: async (authentication_number) => {
    try {
      const authentication_number_match = await Authentication.findOne({
        where: {
          authentication_number,
        }
      });
      return authentication_number_match;
    } catch (err) {
      throw err;
    }
  },
}