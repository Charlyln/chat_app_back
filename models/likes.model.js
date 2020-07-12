const Sequelize = require("sequelize");

const sequelizeInstance = require("../sequelize");

const Likes = sequelizeInstance.define(
  "Likes",
  {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }
);

module.exports = Likes;
