const express = require("express");
const likes = express.Router();
const Like = require("../models/likes.model");
const Message = require("../models/message.model");
const User = require("../models/user.model");

likes.get("/", async (req, res) => {
  try {
    const likes = await Like.findAll({ include: [{ model: User }] });
    res.status(200).json(likes);
  } catch (err) {
    res.status(400).json(err);
  }
});

likes.post("/", async (req, res) => {
  const { MessageUuid, UserUuid, number } = req.body;
  try {
    const likes = await Like.create({
      MessageUuid,
      UserUuid,
      number,
    });
    res.status(201).json(likes);
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = likes;
