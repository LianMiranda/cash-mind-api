const Transaction = require("../../api/models/Transaction");
const User = require("../../api/models/User");

User.hasMany(Transaction, {foreignKey: "userId"});
Transaction.belongsTo(User, {foreignKey: "userId"});

module.exports = {Transaction, User}