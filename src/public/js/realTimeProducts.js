const socket = io();

socket.on("saludo", (data) => {
    console.log("mensaje del servidor", data);
});
