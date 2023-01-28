const express = require("express");
const { signin, signup } = require("../controllers/authController");
const {
  getUser,
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/signin").post(signin);

userRouter.route("/signup").post(signup);

userRouter.route("/:username").get(getUser);

userRouter.route("/:username/following").get(getFollowing);

userRouter.route("/:username/followers").get(getFollowers);

userRouter.route("/:username/follow").post(followUser).delete(unfollowUser);

module.exports = userRouter;
