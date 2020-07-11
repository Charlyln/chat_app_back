const express = require("express");
const messages = express.Router();
const Message = require("../models/message.model");
const User = require("../models/user.model")

messages.get("/", async (req, res) => {
  try {
    const messages = await Message.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json(err);
  }
});

messages.post("/", async (req, res) => {
  const { content, UserUuid } = req.body;
  try {
    const message = await Message.create({
      content,
      UserUuid,
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(422).json(err);
  }
});

// app.get("/messages", function (req, res) {
//   Message.findAll({
//     include: [{ model: User }],
//   }).then(function (results) {
//     res.json(results);
//   });
// });

// app.post("/messages", async (req, res) => {
//   const { content, userUuid } = req.body;
//   try {
//     const message = await Message.create({
//       content,
//       userUuid,
//     });
//     res.status(201).json(message);
//   } catch (err) {
//     res.status(422).json(err);
//   }
// });

// app.get("/messages/:uuid", async (req, res) => {
//   const uuid = req.params.uuid;
//   try {
//     const message = await Message.findOne({ where: { uuid } });
//     res.status(200).json(message);
//   } catch (err) {
//     res.status(422).json({
//       status: "error",
//       message: "invalid request",
//     });
//   }
// });

// app.put("/messages/:uuid", async (req, res) => {
//   const uuid = req.params.uuid;
//   const { content, likes, userUuid } = req.body;
//   try {
//     await Message.update(
//       {
//         content,
//         likes,
//         userUuid,
//       },
//       { where: { uuid } }
//     );
//     res.status(201).end();
//   } catch (err) {
//     res.status(422).json({
//       status: "error",
//       message: "invalid request",
//     });
//   }
// });

// app.put("/messages/:uuid/click", async (req, res) => {
//   const uuid = req.params.uuid;
//   try {
//     await Message.update(
//       {
//         likes: sequelize.literal("likes+1"),
//       },
//       { where: { uuid } }
//     );
//     res.status(201).end();
//   } catch (err) {
//     res.status(422).json(err);
//   }
// });

module.exports = messages;
