const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const Followers = sequelizeInstance.define("Followers", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  followerId: Sequelize.STRING,
});

module.exports = Followers;
