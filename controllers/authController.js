const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

async function signin(req, res) {
  try {
    const data = req.body;
    const user = await userModel.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({
        message: "Email not found",
      });
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (isMatch) {
      return res.json({
        message: `Welcome ${user.username}`,
        user: user,
      });
    } else {
      return res.json({
        message: "Wrong credentials",
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}

async function signup(req, res) {
  try {
    const data = req.body;
    const user = await userModel.create(data);
    if (user) {
      return res.json({
        message: "New account created",
        user: user,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
}

module.exports = { signin, signup };
