// socket.js
const socketIo = require("socket.io");

let io; // Define the io variable

const initSocket = (server) => {
  io = socketIo(server, {
    // function to initiliasise socket io instance
    cors: {
      origin: ["0.0.0.0", "http://localhost:5173", "http://192.168.179.131"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected", socket.id);
  });
};

const getSocket = () => {
  if (!io) {
    throw new Error( // function to
      "Socket.io is not initialized. Call initSocket(server) first."
    );
  }
  return io;
};

module.exports = { initSocket, getSocket };
