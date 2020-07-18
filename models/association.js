const User = require("./user.model");
const Message = require("./message.model");
const Likes = require("./likes.model");
const Followers = require("./followers.model");

User.hasMany(Message, { foreignKey: { allowNull: false } });
Message.belongsTo(User);

Message.hasMany(Likes, { foreignKey: { allowNull: false } });
Likes.belongsTo(Message);

User.hasMany(Likes, { foreignKey: { allowNull: false } });
Likes.belongsTo(User);

User.hasMany(Followers, { foreignKey: { allowNull: false } });
Followers.belongsTo(User);
