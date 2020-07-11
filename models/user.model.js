const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const User = sequelizeInstance.define("user", {
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  pseudo: Sequelize.STRING,
  avatar: Sequelize.STRING,
});

module.exports = User;
