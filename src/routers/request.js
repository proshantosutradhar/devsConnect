const express = require("express");
const { userAuth } = require("../utils/validator");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post("/request/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const toUser = await User.findById(toUserId);

    if (!toUser)
      return res
        .status(404)
        .json({ message: "user not found to send request" });

    const isAllowed = ["interested", "ignored"];

    if (!isAllowed.includes(status)) {
      return res.status(400).send("request status isnt valid.");
    }
    if (fromUserId.equals(toUserId)) {
      return res.status(400).json({message:"You can't send request to yourself."});
    }

    const existingRequest = await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingRequest) {
      return res.status(400).send("request already exists.");
    }

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });
    const data = await connectionRequest.save();

    res.json({
      message: "Connection request sent successfully",
      data,
    });
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = requestRouter;
