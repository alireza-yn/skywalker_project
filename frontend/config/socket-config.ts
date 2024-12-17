import { io } from "socket.io-client";

const socket = io(process.env.ws,{
    transports:["websocket"]
})

export default socket