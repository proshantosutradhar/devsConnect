const express = require('express');
const mongoose = require('mongoose');
const { userAuth } = require('../utils/validator');
const ChatModel = require('../models/chat');

const chatRouter = express.Router();

chatRouter.get('/chat/:targetId', userAuth, async (req, res) => {
  const userId = req.user._id;
  const { targetId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(targetId)) {
      return res.status(400).json({ error: 'Invalid targetId' });
    }

    let chat = await ChatModel.findOne({
      $or: [
        { senderId: userId, receiverId: targetId },
        { senderId: targetId, receiverId: userId },
      ],
    }).populate({
        path: 'messages.senderId',
        select: 'firstName lastName'
    });


    return res.json(chat);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = chatRouter;