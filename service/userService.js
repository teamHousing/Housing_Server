const {User} = require('../models')

module.exports={
    login:async(email,password)=>{
        const user = await User.findOne({where:{email:email,password:password}})
        console.log('user',user)
        return user
    }
}