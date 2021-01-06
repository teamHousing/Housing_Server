const {User,HouseInfo} = require('../models')

module.exports={
    getUnit:async(address)=>{
        const unitList = await User.findAll({where:{type:1,address:address},attributes:['id','unit','house_info_id']})
        return unitList
    }
}
