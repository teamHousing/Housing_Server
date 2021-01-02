module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Notice',{
        notice_title:{
            type : DataTypes.STRING
        },
        notice_contents:{
            type : DataTypes.STRING
        },
        notice_date:{
            type:DataTypes.DATEONLY
        },
        notice_time:{
            type:DataTypes.STRING
        }
    },{
        freezeTableName:true,
        timestamps:true,
        underscored:true
    })
}