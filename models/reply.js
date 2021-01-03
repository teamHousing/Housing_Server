module.exports = function async(sequelize,DataTypes){
    return sequelize.define('Reply',{
        user_status:{ //사용자 리플
            type:DataTypes.STRING,
            defaultValue:"[]"
        },
        owner_status:{//집주인 리플
            type:DataTypes.STRING,
            defaultValue:"[]"
        }
    },{
        freezeTableName:true,
        timestamp:true,
        underscored:true
    })
}