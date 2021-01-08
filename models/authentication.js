module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Authentication',{
        unit:{ //동
            type:DataTypes.INTEGER
        },
        authentication_number:{ //인증번호
            type:DataTypes.INTEGER,
            allowNull:true
        },
        address:{ //주소
            type:DataTypes.STRING
        },
        building:{ //건물명(동)
            type:DataTypes.STRING
        }
    },{
        freezeTableName:true,
        timestamp:true,
        underscored:true
    })
}