module.exports=function async(sequelize,DataTypes){
    return sequelize.define('User',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        building:{
            type:DataTypes.STRING,
            allowNull:false
        },
        unit:{
            type:DataTypes.STRING
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