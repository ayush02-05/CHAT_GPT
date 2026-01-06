const ChatModel = require("../models/chat.model");
async function createChat(req, res) {
  const { title } = req.body;
  const user = req.user;

  const chat = await ChatModel.create({
    user: user._id,
    title: title,
  });

  res.status(201).json({
    message: "Chat created successfully",
    chat: {
      _id: chat._id,
      title: chat.title,
      lastactivity: chat.lastactivity,
      user: chat.user,
    },
  });
}

module.exports = {
  createChat,
};
