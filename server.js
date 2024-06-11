// @ts-nocheck
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const expressMongoSanitize = require("express-mongo-sanitize");
const http = require("http");
const socketIo = require("socket.io");

// Initialize Express app
const app = express();

// Set up middleware
app.use(helmet());
app.use(xss());
app.use(expressMongoSanitize());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

require("./config/db_connection").db_connection();

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  socket.emit("FromAPI", response);
};

const PORT = process.env.APP_PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
app.use("/", require("./routes"));
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception", err);
});

module.exports = { app};
