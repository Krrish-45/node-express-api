const chatModel = require("../database/mongodb").models.chat;
const { getIndianCurrentUnixDateTime } = require("../utils");

exports = module.exports = async io => {
  io.sockets.on("connection", async socket => {
    socket.on("input", async data => {
      io.to(socket.id).emit("receiveMessage", "Test Message");
    });

    socket.on("disconnect", async data => {
      // Automatically call when socket was disconnected
    });
  });
};
