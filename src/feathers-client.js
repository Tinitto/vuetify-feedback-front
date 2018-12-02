import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";
import io from "socket.io-client";

export const makeFeathersClient = socketServerUrl => {
  const socket = io(socketServerUrl, {
    transports: ["websocket"],
    forceNew: true
  });
  return feathers()
    .configure(socketio(socket))
    .configure(auth({ storage: window.localStorage }));
};
