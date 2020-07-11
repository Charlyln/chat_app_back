const express = require("express");
const users = express.Router();
const User = require("../models/user.model");

users.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

users.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: {
        id,
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

// app.delete("/users/:uuid", async (req, res) => {
//   const uuid = req.params.uuid;
//   try {
//     await User.destroy({ where: { uuid } });
//     res.status(204).send("Votre compte a été supprimé");
//   } catch (err) {
//     res.status(422).json(err);
//   }
// });

module.exports = users;
