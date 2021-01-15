module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Notice',{
        notice_title:{
            type : DataTypes.STRING
        },
        notice_contents:{
            type : DataTypes.STRING(1000)
        },
        notice_year:{
            type:DataTypes.INTEGER
        },
        notice_month:{
            type:DataTypes.INTEGER
        },
        notice_day:{
            type:DataTypes.INTEGER
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