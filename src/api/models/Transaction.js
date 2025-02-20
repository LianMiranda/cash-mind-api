const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database/connection");

const Transaction = sequelize.define(
  "transactions",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      unique: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ["DESPESA", "RECEITA"]
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      onDelete: "CASCADE",
      references:{
        model: "users",
        key: "id"
      }
    },
  },
 { freezeTableName: true}
);

Transaction.sync();

module.exports = Transaction
