import { io } from "socket.io-client";
const socket = io.connect("http://localhost:19000");
export default socket;