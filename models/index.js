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

db.User = require('./user')(sequelize,Sequelize) //사용자
db.Issue = require('./issue')(sequelize,Sequelize) //소통(문의)
db.HouseInfo = require('./houseInfo')(sequelize,Sequelize) //집정보
db.Notice = require('./notice')(sequelize,Sequelize) //공지사항
db.Reply = require('./reply')(sequelize,Sequelize)//문의 댓글
db.Authentication = require('./authentication')(sequelize,Sequelize) //인증번호

//1:N *HouseInfo : Notice
db.HouseInfo.hasMany(db.Notice,{onDelete:'cascade',foreignKey:'house_info_id'})
db.Notice.belongsTo(db.HouseInfo)

//1:N *User : Issue
db.User.hasMany(db.Issue,{onDelete:'cascade',foreignKey:'user_id'})
db.Issue.belongsTo(db.User)

//1:N *HouseInfo : User
db.HouseInfo.hasMany(db.User,{onDelete:'cascade',foreignKey:'house_info_id'})
db.User.belongsTo(db.HouseInfo)

//1:N *HouseInfo : Issue
db.HouseInfo.hasMany(db.Issue,{onDelete:'cascade',foreignKey:'house_info_id'})
db.Issue.belongsTo(db.HouseInfo)

//1:N *Issue : reply
db.Issue.hasMany(db.Reply,{onDelete:'cascade',foreignKey:'issue_id'})
db.Reply.belongsTo(db.Issue)

// //1:N *User : Authentication
// db.User.hasMany(db.Authentication,{onDelete:'cascade',foreignKey:'user_id'})
// db.Authentication.belongsTo(db.User)

module.exports = db;