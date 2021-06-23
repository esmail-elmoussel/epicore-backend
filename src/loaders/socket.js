const socket = require("socket.io");
const config = require("../config");

// setup socket.io
const initializeSocket = ({ server }) => {
  const io = socket(server, {
    cors: {
      origin: config.SOCKET_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("made socket connection", socket.id);

    socket.on("codeVerifiedSuccessfully", () => {
      io.sockets.emit("codeVerifiedSuccessfully", { message: "success" });
    });
  });
};

module.exports = initializeSocket;
