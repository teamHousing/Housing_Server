module.exports=function async(sequelize,DataTypes){
    return sequelize.define('User',{
        name:{
            type:DataTypes.STRING,
        },
        email:{
            type:DataTypes.STRING,
        },
        password:{
            type:DataTypes.STRING
        },
        residential_area:{
            type:DataTypes.STRING
        },
        address:{
            type:DataTypes.STRING
        },
        unit:{
            type:DataTypes.STRING
        },
        type:{ //사용자구분(집주인:0, 자취생:1)
            type:DataTypes.INTEGER
        }
    },{
        freezeTableName:true,
        timestamps:true,
        underscored:true
    })
}