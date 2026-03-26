require("dotenv").config();
const { createServer } = require("http");

const app = require("./src/app");
const httpServer = createServer(app);

const ConnectTODB = require("./src/db/db");
const initSocketServer = require("./src/Socket/Socket.server");

ConnectTODB();
initSocketServer(httpServer);

httpServer.listen(process.env.PORT, (req, res) => {
  console.log(`server is now running on port ${process.env.PORT}✅`);
});
