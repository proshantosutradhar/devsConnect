const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const { validateFun } = require("../utils/validator");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, photoUrl, bio, skills } =
    req?.body;
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    photoUrl,
    bio,
    skills,
  });

  try {
    validateFun(req);
    const token = await user.setJWT();
    res.cookie("token", token);
    await user.save();
    res.json({message: "profile added", data: user, token: token});
  } catch (err) {
    res.status(404).json({ message: " user not added", err });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).send("Invalid details");
    }
    const gotPass = await user.passwordCheck(password.trim());
    if (!gotPass) {
      res.status(401).send("Invalid details");
    }
    const token = await user.setJWT();
    res.cookie("token", token);
    res.json({data: user, token: token});
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("logout sucessfull");
});

module.exports = authRouter;
