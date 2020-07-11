const Sequelize = require("sequelize");

if (process.env.DATABASE_URL) {
  module.exports = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
  });
} else {
  module.exports = new Sequelize({
    host: "localhost",
    username: "root",
    password: "Csvecora1",
    database: "model2",
    dialect: "mysql",
  });
}
