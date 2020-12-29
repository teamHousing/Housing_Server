module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Notice',{
        category:{
            type : DataTypes.STRING
        },
        title:{
            type : DataTypes.STRING
        },
        contents:{
            type : DataTypes.STRING
        },
        fix:{
            type : DataTypes.BOOLEAN
        }
    },{
        freezeTableName:true,
        timestamps:false
    })
}