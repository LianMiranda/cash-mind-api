const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database/connection");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      values: ["DESPESA", "RECEITA"]
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onDelete: "CASCADE"
    },
  },
 { freezeTableName: true}
);

Transaction.sync();

module.exports = Transaction
