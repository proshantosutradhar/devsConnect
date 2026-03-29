import { BASE_URL } from "./constants";

import { io } from "socket.io-client";

let socket;

export const createSocketConnection = () => {
  if (!socket) {
    socket = io(BASE_URL);
  }
  if(location.hostname == "localhost"){
     socket = io(BASE_URL);

  } else{
     socket = io("/", {path: "/api/socket.io"})
  }

  return socket;
};