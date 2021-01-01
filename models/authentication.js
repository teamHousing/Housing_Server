module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Authentication',{
        unit:{
            type:DataTypes.STRING
        },
        authentication_number:{
            type:DataTypes.INTEGER,
            allowNull:true
        }
    },{
        freezeTableName:true,
        timestamp:true,
        underscored:true
    })
}