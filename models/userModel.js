const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
require("dotenv").config();

const api_key = process.env.API_KEY;

const link = `mongodb+srv://Punisher007:${api_key}@cluster0.libvpiv.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    try {
      console.log("UserDB Connected!");
    } catch (err) {
      console.log("Error", err);
    }
  });

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: false,
    minLength: 8,
    validate: function () {
      return this.confirmPassword === this.password;
    },
  },
  following: {
    type: Array,
    default: [],
  },
  followers: {
    type: Array,
    default: [],
  },
  posts: {
    type: Array,
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  this.confirmPassword = undefined;
  const salt = await bcrypt.genSalt(10);
  const hashGen = await bcrypt.hash(this.password, salt);
  this.password = hashGen;
  next();
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
