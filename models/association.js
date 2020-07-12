const User = require("./user.model");
const Message = require("./message.model");
const Likes = require("./likes.model");

User.hasMany(Message, { foreignKey: { allowNull: false }, as: "messages" });
Message.belongsTo(User);

Message.hasMany(Likes, { foreignKey: { allowNull: false } });
Likes.belongsTo(Message);

User.hasMany(Likes, { foreignKey: { allowNull: false } });
Likes.belongsTo(User);
