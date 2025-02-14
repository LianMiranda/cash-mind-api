const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../../config/database/connection");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
 { freezeTableName: true}
);

User.sync()

module.exports = User
