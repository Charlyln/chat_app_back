const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const Post = sequelizeInstance.define("Post", {
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  content: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
});

module.exports = Post;
