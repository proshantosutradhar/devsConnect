const socket = require("socket.io");
const crypto = require("crypto");
const ChatModel = require("../models/chat");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "https://devsconnect-v1.onrender.com/",
    },
  });

  const getRoomId = (userId, targetId) => {
    return crypto
      .createHash("sha256")
      .update([userId, targetId].sort().join("_"))
      .digest("hex");
  };

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetId }) => {
      const room = getRoomId(userId, targetId);
      socket.join(room);
    });
    socket.on("sendMessage", async ({ firstName, lastName, text, userId, targetId }) => {
      const room = getRoomId(userId, targetId);

      try {
        let chat = await ChatModel.findOne({
          $or: [
            { senderId: userId, receiverId: targetId },
            {
              senderId: targetId,
              receiverId: userId,
            },
          ],
        });

        if (!chat) {
          chat = new ChatModel({
            senderId: userId,
            receiverId: targetId,
            messages: [],
          });
        }

        chat.messages.push({
          senderId: userId,
          text,
        });

        await chat.save();
      } catch (err) {
        console.log(err);
      }

      io.to(room).emit("receivedMessage", {
        firstName,
        lastName,
        text
      });
    });
    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
