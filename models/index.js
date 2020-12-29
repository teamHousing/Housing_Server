const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
 sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
 sequelize = new Sequelize(config.database, config.username, config.password, config);
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize,Sequelize)
db.Issue = require('./issue')(sequelize,Sequelize)
db.HouseInfo = require('./houseInfo')(sequelize,Sequelize)
db.Notice = require('./notice')(sequelize,Sequelize)

db.HouseInfo.hasMany(db.Notice,{onDelete:'cascade'})
db.Notice.belongsTo(db.HouseInfo)

module.exports = db;