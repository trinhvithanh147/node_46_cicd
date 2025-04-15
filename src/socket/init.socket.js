import { Server } from "socket.io";
import handleChatSocket from "./chat.socket.js";
import handleNotificationSocket from "./notification.js";

const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    /* options */
  });
  io.on("connection", (socket) => {
    // ... socket là client
    console.log(`id:${socket.id}`);
    handleChatSocket(io, socket);

    handleNotificationSocket(io, socket);
  });
};

export default initSocket;
