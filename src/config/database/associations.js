const Transaction = require("../../api/models/Transaction");
const User = require("../../api/models/User");

User.hasMany(Transaction, {foreignKey: "userId", as: "transactions"});
Transaction.belongsTo(User, {foreignKey: "userId", as: "user"});

module.exports = {Transaction, User}