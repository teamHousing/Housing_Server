module.exports=function async(sequelize,DataTypes){
    return sequelize.define('User',{
        user_name:{//사용자이름
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{//사용자아이디
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{//사용자비번
            type:DataTypes.STRING,
            allowNull:false
        },
        address:{//주소
            type:DataTypes.STRING,
            allowNull:false
        },
        building:{//건물명(동)
            type:DataTypes.STRING,
            allowNull:false
        },
        unit:{//호수
            type:DataTypes.INTEGER
        },
        type:{ //사용자구분(집주인:0, 자취생:1)
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        freezeTableName:true,
        timestamps:true,
        underscored:true
    })
}