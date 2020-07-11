const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const Message = sequelizeInstance.define("Message", {
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  content: Sequelize.STRING,
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Message;
