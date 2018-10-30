import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:5000/");

const connect = callback => {
    socket.on("chat", message => {
        console.log("message");
        callback(message);
    });
};

export default connect;
