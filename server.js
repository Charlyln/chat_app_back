const express = require("express");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});
var cors = require("cors");

const User = sequelize.define("user", {
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  pseudo: Sequelize.STRING,
  avatar: Sequelize.STRING,
});

const Message = sequelize.define("message", {
  uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  content: Sequelize.STRING,
  likes: Sequelize.INTEGER,
});

User.hasMany(Message, { foreignKey: { allowNull: true }, as: "messages" });
Message.belongsTo(User);

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send("Here is my API!");
});

app.get("/users", function (req, res) {
  User.findAll({ include: [{ model: Message, as: "messages" }] }).then(
    function (results) {
      res.json(results);
    }
  );
});

app.get("/messages", function (req, res) {
  Message.findAll({
    include: [{ model: User }],
  }).then(function (results) {
    res.json(results);
  });
});

app.post("/users", async (req, res) => {
  const { pseudo, avatar } = req.body;
  try {
    const user = await User.create({
      pseudo,
      avatar,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.get("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      include: [{ model: Message, as: "messages" }],
      where: { uuid },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

app.put("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const { pseudo, avatar } = req.body;
  try {
    await User.update(
      {
        pseudo,
        avatar,
      },
      { where: { uuid } }
    );
    res.status(201).end();
  } catch (err) {
    res.status(422).json(err);
  }
});

app.delete("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    await User.destroy({ where: { uuid } });
    res.status(204).send("Votre compte a été supprimé");
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post("/messages", async (req, res) => {
  const { content, userUuid } = req.body;
  try {
    const message = await Message.create({
      content,
      userUuid,
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.get("/messages/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const message = await Message.findOne({ where: { uuid } });
    res.status(200).json(message);
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

app.put("/messages/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  const { content, likes, userUuid } = req.body;
  try {
    await Message.update(
      {
        content,
        likes,
        userUuid,
      },
      { where: { uuid } }
    );
    res.status(201).end();
  } catch (err) {
    res.status(422).json({
      status: "error",
      message: "invalid request",
    });
  }
});

app.put("/messages/:uuid/click", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    await Message.update(
      {
        likes: sequelize.literal("likes+1"),
      },
      { where: { uuid } }
    );
    res.status(201).end();
  } catch (err) {
    res.status(422).json(err);
  }
});

async function main() {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log("Database succesfully joined");
    app.listen(PORT, (err) => {
      if (err) throw new Error(err.message);
      console.log(`Server is running on htpp://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Unable to join database", err.message);
  }
}

main();
