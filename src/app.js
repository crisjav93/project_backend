import express from "express";
import productsRouter from "./routes/productsRoutes.js";
import cartsRouter from './routes/cartRouter.js';
const app = express();
app.use(express.urlencoded({ extended:true })); //* se encarga de transformar los datos del req
app.use(express.json()); //* se encarga de transformar los datos ingresados en .json

app.use("/api/products", productsRouter); //creamos virtualización de la ruta
app.use("/api/carts", cartsRouter); //creamos virtualización de la ruta de los carritos


app.listen(8080, () => {
    console.log("estoy escuhando para el servicio");
});
