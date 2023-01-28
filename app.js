const express = require("express");
const userRouter = require("./Routers/userRouter");
const userModel = require("./models/userModel");

const app = express();

//Middleware
app.use(express.json());

app.listen(8000, () => {
  console.log("Server started");
});

//Routes
app.get("/", (req, res) => {
  res.send("Hello Channel");
});

app.use("/users", userRouter);
// app.use("/users/:username", userRouter);
