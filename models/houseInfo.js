module.exports=function async(sequelize,DataTypes){
    return sequelize.define('HouseInfo',{
        house_name:{
            type : DataTypes.STRING
        },
        profile_message:{
            type : DataTypes.STRING
        },
        profile_img:{
            type : DataTypes.STRING
        },
        hope_time:{
            type : DataTypes.STRING
        },
        response_time:{
            type : DataTypes.STRING
        }
    },{
        freezeTableName:true,
        timestamps:true
    })
}