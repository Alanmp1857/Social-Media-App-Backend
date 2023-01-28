const mongoose = require("mongoose");
const userModel = require("../models/userModel");

async function getUser(req, res) {
  try {
    const { username } = req.params;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      return res.json({
        message: "User found",
        user: user,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}

async function getFollowers(req, res) {
  try {
    const { username } = req.params;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      return res.json({
        message: `${user.username} list`,
        user: user.followers,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}

async function getFollowing(req, res) {
  try {
    const { username } = req.params;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      return res.json({
        message: `${user.username} Following list`,
        user: user.following,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}

async function followUser(req, res) {
  try {
    const { username } = req.params;
    const { followerName } = req.body;
    const follower = await userModel.findOne({ username: followerName });
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (!follower) {
      return res.status(404).json({
        message: "The person who you want to follow does not exist.",
      });
    } else {
      user.following.push(followerName);
      await user.save();
      follower.followers.push(username);
      await follower.save();
      return res.json({
        message: `You are following ${followerName}`,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}

async function unfollowUser(req, res) {
  try {
    const { username } = req.params;
    const { followerName } = req.body;
    const follower = await userModel.findOne({ username: followerName });
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (!follower) {
      return res.status(404).json({
        message: "The person who you want to follow does not exist.",
      });
    } else {
      user.following = user.following.filter((ele) => ele !== followerName);
      console.log(user.following);
      await user.save();
      follower.followers = follower.followers.filter((ele) => ele !== username);
      await follower.save();
      return res.json({
        message: `You have unfollowed ${followerName}`,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}

// async function createPost(req, res) {
//   const { post } = req.body;
// }

module.exports = {
  getUser,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
};
