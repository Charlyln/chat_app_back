const express = require("express");
const followers = express.Router();
const Follower = require("../models/followers.model");

followers.get("/", async (req, res) => {
  try {
    const followers = await Follower.findAll();
    res.status(200).json(followers);
  } catch (err) {
    res.status(400).json(err);
  }
});

followers.get("/:followerId", async (req, res) => {
  const followerId = req.params.followerId;
  try {
    const followers = await Follower.findAll({ where: { followerId } });
    res.status(200).json(followers);
  } catch (err) {
    res.status(400).json(err);
  }
});

followers.post("/", async (req, res) => {
  const { UserUuid, followerId } = req.body;
  try {
    const followers = await Follower.create({
      UserUuid,
      followerId,
    });
    res.status(201).json(followers);
  } catch (err) {
    res.status(422).json(err);
  }
});

followers.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Follower.destroy({ where: { id } });
    res.status(204).send("Votre follower a été supprimé");
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = followers;
