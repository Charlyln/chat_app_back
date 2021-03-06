const express = require("express");
const users = express.Router();
const User = require("../models/user.model");
const Message = require("../models/message.model");
const Likes = require("../models/likes.model");
const Followers = require("../models/followers.model");

users.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Message,
          include: [
            {
              model: Likes,
            },
          ],
        },
        { model: Followers },
      ],
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

users.get("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      include: [{ model: Likes }, { model: Followers }],
      where: {
        uuid,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Invalid request",
    });
  }
});

users.post("/", async (req, res) => {
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

// app.get("/users", function (req, res) {
//   User.findAll({ include: [{ model: Message, as: "messages" }] }).then(
//     function (results) {
//       res.json(results);
//     }
//   );
// });

// app.post("/users", async (req, res) => {
//   const { pseudo, avatar } = req.body;
//   try {
//     const user = await User.create({
//       pseudo,
//       avatar,
//     });
//     res.status(201).json(user);
//   } catch (err) {
//     res.status(422).json(err);
//   }
// });

// app.get("/users/:uuid", async (req, res) => {
//   const uuid = req.params.uuid;
//   try {
//     const user = await User.findOne({
//       include: [{ model: Message, as: "messages" }],
//       where: { uuid },
//     });
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(422).json({
//       status: "error",
//       message: "invalid request",
//     });
//   }
// });

// app.put("/users/:uuid", async (req, res) => {
//   const uuid = req.params.uuid;
//   const { pseudo, avatar } = req.body;
//   try {
//     await User.update(
//       {
//         pseudo,
//         avatar,
//       },
//       { where: { uuid } }
//     );
//     res.status(201).end();
//   } catch (err) {
//     res.status(422).json(err);
//   }
// });

users.delete("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    await User.destroy({ where: { uuid } });
    res.status(204).send("Votre compte a été supprimé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = users;
