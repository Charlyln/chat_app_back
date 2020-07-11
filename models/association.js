const User = require("./user.model");
const Message = require("./message.model");

User.hasMany(Message, { foreignKey: { allowNull: false }, as: "messages" });
Message.belongsTo(User);
