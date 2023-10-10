
const config = require(__dirname + '/../config/config.json');
const Sequelize = require('sequelize');
const sequelizeInstance = new Sequelize(config.database, config.username,config.password, {
  host : config.host,
  dialect : config.dialect
})

const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelizeInstance

db.tasks = require("./tasks.models.js")(sequelizeInstance,Sequelize)
module.exports = db


