const { Sequelize } = require("sequelize");
const env = require('../EnvConfig/env.config');
require("dotenv").config();


const sequelize = new Sequelize(env.database.name, env.database.user, env.database.password, {
    host: env.database.host,
    dialect: "mysql"
})

const connection = async () => {
        sequelize.authenticate().then(() =>{
            console.log('Connection has been established successfully.');
        }).catch (error => {
            console.error('Unable to connect to the database:', error)
        });
}

connection();

module.exports = sequelize;