module.exports=function async(sequelize,DataTypes){
    return sequelize.define('HouseInfo',{
        owner_name:{
            type : DataTypes.STRING
        },
        profile_message:{
            type : DataTypes.STRING
        },
        profile_img:{
            type : DataTypes.STRING
        },
        hope_time:{
            type : DataTypes.STRING,
            set:function(val){
                return this.setDataValue('hope_time',JSON.stringify(val))
            },
            get:function(){
                return JSON.parse(this.getDataValue('hope_time'))
            }
        },
        response_time:{
            type : DataTypes.STRING
        }
    },{
        freezeTableName:true,
        timestamps:true,
        underscored:true
    })
}