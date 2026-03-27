import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef(null);

  const { targetId } = useParams();
  const user = useSelector((store) => store.user);

  const userId = user?._id;

  const fetchMessages = async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + targetId, {
        withCredentials: true,
      });
      const chat = res?.data?.messages;
      setMessages(chat || []);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!userId || !targetId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", { userId, targetId });

    const handleMessage = ({ firstName, lastName, text, userId }) => {
      setMessages((prev) => [
        ...prev,
        {
          senderId: {
            firstName,
            lastName,
            _id: userId,
          },
          text,
        },
      ]);
    };

    socket.on("receivedMessage", handleMessage);

    return () => {
      socket.off("receivedMessage", handleMessage);
    };
  }, [userId, targetId]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const socket = createSocketConnection();

    const messageData = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      text: newMessage,
      userId,
      targetId,
    };

    socket.emit("sendMessage", messageData);

    setNewMessage("");
  };

  return (
    <div className="flex justify-center items-center bg-base-100 p-2">
      <div className="w-full max-w-3xl h-[70vh] flex flex-col bg-base-300 rounded-2xl shadow-lg">
        <div className="p-4 border-b border-base-200 bg-base-100">
          <h2 className="text-lg font-semibold">Chat Box</h2>
        </div>

        <div ref={chatRef} className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages?.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              No messages yet
            </div>
          ) : (
            messages?.map((msg, index) => (
              <div
                key={index}
                className={`chat flex flex-col ${
                  msg?.senderId?.firstName == user?.firstName
                    ? "chat-end items-end"
                    : "chat-start items-start"
                }`}
              >
                <div className="chat-header capitalize py-2">
                  {`${msg?.senderId?.firstName} ${msg?.senderId?.lastName}`}
                </div>
                <div
                  className={`chat-bubble ${
                    msg?.senderId?.firstName == user.firstName
                      ? "chat-bubble-success"
                      : "chat-bubble-primary"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-base-200 bg-base-100">
          <div className="flex gap-2">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              type="text"
              placeholder="Type your message..."
              className="input input-bordered input-success w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
            />

            <button onClick={handleSend} className="btn btn-success">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
