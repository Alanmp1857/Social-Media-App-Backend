"use strict";

var mongoose = require("mongoose");

var userModel = require("../models/userModel");

function getUser(req, res) {
  var username, user;
  return regeneratorRuntime.async(function getUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          username = req.params.username;
          _context.next = 4;
          return regeneratorRuntime.awrap(userModel.findOne({
            username: username
          }));

        case 4:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 9:
          return _context.abrupt("return", res.json({
            message: "User found",
            user: user
          }));

        case 10:
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log("error", _context.t0);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

function getFollowers(req, res) {
  var username, user;
  return regeneratorRuntime.async(function getFollowers$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          username = req.params.username;
          _context2.next = 4;
          return regeneratorRuntime.awrap(userModel.findOne({
            username: username
          }));

        case 4:
          user = _context2.sent;

          if (user) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 9:
          return _context2.abrupt("return", res.json({
            message: "".concat(user.username, " list"),
            user: user.followers
          }));

        case 10:
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.log("error", _context2.t0);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

function getFollowing(req, res) {
  var username, user;
  return regeneratorRuntime.async(function getFollowing$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          username = req.params.username;
          _context3.next = 4;
          return regeneratorRuntime.awrap(userModel.findOne({
            username: username
          }));

        case 4:
          user = _context3.sent;

          if (user) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 9:
          return _context3.abrupt("return", res.json({
            message: "".concat(user.username, " Following list"),
            user: user.following
          }));

        case 10:
          _context3.next = 15;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.log("error", _context3.t0);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

function followUser(req, res) {
  var followerName, username, follower, user;
  return regeneratorRuntime.async(function followUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          followerName = req.params.username;
          username = req.body.username;
          _context4.next = 5;
          return regeneratorRuntime.awrap(userModel.findOne({
            username: followerName
          }));

        case 5:
          follower = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(userModel.findOne({
            username: username
          }));

        case 8:
          user = _context4.sent;

          if (user) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "User not found"
          }));

        case 11:
          if (follower) {
            _context4.next = 15;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: "The person who you want to follow does not exist."
          }));

        case 15:
          user.following.push(followerName);
          _context4.next = 18;
          return regeneratorRuntime.awrap(user.save());

        case 18:
          follower.followers.push(username);
          return _context4.abrupt("return", res.json({
            message: "You are following ".concat(followerName)
          }));

        case 20:
          _context4.next = 25;
          break;

        case 22:
          _context4.prev = 22;
          _context4.t0 = _context4["catch"](0);
          console.log("error", _context4.t0);

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 22]]);
}

module.exports = {
  getUser: getUser,
  getFollowers: getFollowers,
  getFollowing: getFollowing
};