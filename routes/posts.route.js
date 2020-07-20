const express = require("express");
const posts = express.Router();
const Post = require("../models/post.model");
const User = require("../models/user.model");
const Likes = require("../models/likes.model");
const Followers = require("../models/followers.model");
const Comments = require("../models/comments.model");

posts.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: Likes },
        {
          model: User,
          include: [
            {
              model: Followers,
            },
          ],
        },
        {
          model: Comments,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

posts.post("/", async (req, res) => {
  const { content, UserUuid, imageUrl } = req.body;
  try {
    const posts = await Post.create({
      content,
      UserUuid,
      imageUrl,
    });
    res.status(201).json(posts);
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = posts;
