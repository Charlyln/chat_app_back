const express = require("express");
const comments = express.Router();
const Comment = require("../models/comments.model");
const User = require("../models/user.model");

comments.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll({ include: [{ model: User }] });
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json(err);
  }
});

comments.post("/", async (req, res) => {
  const { UserUuid, content, PostUuid } = req.body;
  try {
    const comments = await Comment.create({
      PostUuid,
      UserUuid,
      content,
    });
    res.status(201).json(comments);
  } catch (err) {
    res.status(422).json(err);
  }
});

comments.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Comment.destroy({ where: { id } });
    res.status(204).send("Votre Comment a été supprimé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = comments;
