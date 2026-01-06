const { Server } = require("socket.io");
const aiService = require("../Services/ai.service");
function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.on("connection", (socket) => {
    socket.on("ai-message", async (data) => {
      const message = JSON.parse(data);
      console.log(message);

      const response = await aiService.generateResponse(message.content);
      socket.emit("ai-response", response);
    });
  });
}

module.exports = initSocketServer;
