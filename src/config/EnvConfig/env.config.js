const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  secret: process.env.SECRET,
  port: process.env.PORT,
  database: {
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DATABASE,
  },
};