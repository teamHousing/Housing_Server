module.exports = function async(sequelize,DataTypes){
    return sequelize.define('Reply',{
        reply:{
            type:DataTypes.TEXT
        },
        writer_type:{
            type:DataTypes.INTEGER
        }
    },{
        freezeTableName:true,
        timestamp:true,
        underscored:true
    })
}