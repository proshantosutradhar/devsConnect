const express = require("express");
const { userAuth } = require("../utils/validator");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");


const userRouter = express.Router();

const dataToProvide = [
  "firstName",
  "lastName",
  "photoUrl",
  "age",
  "gender",
  "skills",
  "bio",
];
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const requests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", dataToProvide);

    if (!requests) {
      return res.send("No requests found");
    }
    const usersData = requests.map((key) => key.fromUserId);

    res.json({ message: "Data fatched successfully", data: usersData });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

userRouter.get("/user/requests/matches", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const matches = await ConnectionRequestModel.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", dataToProvide)
      .populate("toUserId", dataToProvide);

    if (matches.length == 0) {
      return res.send("No requests found");
    }
    const usersData = matches.map((key) => {
      if (key.fromUserId._id.toString() == loggedInUser._id.toString()) {
        return key.toUserId;
      }
      return key.fromUserId;
    });

    res.json({ message: "Data fatched successfully", data: usersData });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 20 ? 20: limit;
    const skipCount = (page - 1)*10;

    const loggedInUser = req.user;
    const users = await ConnectionRequestModel.find({
      $or: [
        {
          toUserId: loggedInUser._id,
        },
        {
          fromUserId: loggedInUser._id,
        },
      ],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    users.forEach((val) => {
      hideUsersFromFeed.add(val.fromUserId).toString();
      hideUsersFromFeed.add(val.toUserId).toString();
    });

    const visibleUsers = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    }).select(dataToProvide).skip(skipCount).limit(limit);

    res.json({ message: "Data fatched successfully", data: visibleUsers });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = userRouter;
