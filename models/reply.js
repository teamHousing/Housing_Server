module.exports = function async(sequelize,DataTypes){
    return sequelize.define('Reply',{
        user_status:{ //사용자 리플
            type:DataTypes.STRING,
            defaultValue:"[0]",
            set:function(val){
                return this.setDataValue('user_status',JSON.stringify(val))
            },
            get:function(){
                return JSON.parse(this.getDataValue('user_status'))
            }
        },
        owner_status:{//집주인 리플
            type:DataTypes.STRING,
            defaultValue:"[0]",
            set:function(val){
                return this.setDataValue('owner_status',JSON.stringify(val))
            },
            get:function(){
                return JSON.parse(this.getDataValue('owner_status'))
            }
        }
    },{
        freezeTableName:true,
        timestamp:true,
        underscored:true
    })
}