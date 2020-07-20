const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const Comment = sequelizeInstance.define("Comment", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  content: Sequelize.STRING,
});

module.exports = Comment;
