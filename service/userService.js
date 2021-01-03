const {User,Authentication} = require('../models')

module.exports={
    login:async(email,password)=>{
        const user = await User.findOne({where:{email:email,password:password}})
        console.log('user',user)
        return user
    },
    registration: async (type, user_name, age, email, password, address, building, unit) => {
        try{
            const user = await User.create({
                type,
                user_name,
                age,
                email,
                password,
                address,
                building,
                unit,
            })
            return user
        } catch(err){
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
          if (password == password_check){
              return 1;
          } else{
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