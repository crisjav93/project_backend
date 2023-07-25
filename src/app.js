import express from "express";
import productsRouter from "./routes/productsRoutes.js";
import cartsRouter from './routes/cartRouter.js';
import handlerbars from "express-handlebars";
import viewsRouters from "./routes/viewRouters.js";
import path from "path";
import __dirname from "./utils/utils.js";
import { Server } from "socket.io";

const app = express();
app.use(express.urlencoded({ extended:true })); //* se encarga de transformar los datos del req
app.use(express.json()); //* se encarga de transformar los datos ingresados en .json
app.engine("handlebars", handlerbars.engine());
app.set("views", "./views");
app.set("view engine", "handlebars");
app.use("/api/products", productsRouter); //creamos virtualización de la ruta
app.use("/api/carts", cartsRouter); //creamos virtualización de la ruta de los carritos
app.use("/api/views", viewsRouters);
app.use(express.static(path.join(__dirname, "/public")));

const appServer = app.listen(8080, () => {
    console.log("estoy escuhando para el servicio");
});
// Initialize Socket.IO server
const socketServer = new Server(appServer);

socketServer.on("connection", (socket) => {
    console.log("cliente conectado");
    //
    socket.emit("saludo", "Marta");
});