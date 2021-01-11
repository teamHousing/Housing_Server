const {Notice, Issue, User, Authentication} = require('../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const moment = require('moment')

module.exports = {
  createAuthenticationNumber: async (id, address, building, unit) => {
    try{
      do{
        const randomNumber = await getRandomInt(1000, 10000);
        console.log(randomNumber)
        const alreadyAuthenticationNumber = await (Authentication.findOne({
          where: {
            authentication_number: randomNumber
          },
          attributes: ['authentication_number'],
        })).authentication_number;
        if(!alreadyAuthenticationNumber == null){
          break;
        }else{
          const authentication_information = await Authentication.create({
            address,
            building,
            unit,
            authentication_number: `${randomNumber}`,
          });
          return authentication_information.authentication_number;
        }
      } while (alreadyAuthenticationNumber != null);
      
      
    } catch(err){
      console.error(err);
    }
  },
  checkAuthenticationNumber: async(authentication_number) => {
    const alreadyAuthenticationNumber = await Authentication.findOne({
      where: {
        authentication_number: authentication_number,
      }
    });
    return alreadyAuthenticationNumber;
  },
}

const getRandomInt= async(min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}