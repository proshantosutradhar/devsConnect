const express = require("express");
const { userAuth, updateValidation } = require("../utils/validator");

const profileRouter = express.Router();

profileRouter.get("/api/profile/view", userAuth, async (req, res) => {
  try {
    res.send("profile details " + req.user);
  } catch (err) {
    res.status(400).send("ERROR " + err);
  }
});

profileRouter.patch("/api/profile/edit", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    updateValidation(req);

    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));
    loggedUser.save();

    res.json({ message: "profile updated", data: loggedUser });
  } catch (err) {
    res.status(400).send("ERROR " + err);
  }
});


profileRouter.patch("/api/profile/password", userAuth, async (req, res) => {
  try {
    const { password, newPass } = req.body;

    if (!password || !newPass) {
      return res.status(400).send("Please provide current and new password");
    }

    const user = req.user; 

    const isMatch = await user.passwordCheck(password);
    if (!isMatch) {
      return res.status(400).send("Current password is incorrect");
    }
    user.password = newPass;

    await user.save();

    res.status(200).send("Password updated successfully");

  } catch (err) {
    res.status(400).send(err.message);
  }
});


module.exports = profileRouter;
