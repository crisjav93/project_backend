import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const manager = new ProductManager("./db/products.json");
const viewsRouters = Router();

viewsRouters.get("/", async (req, res) => {
    try {
        const products = await manager.getList();
        res.render("home", { products });
    } catch (error) {
        res.status(400).send({ error: true, message: error.message });
    }
});
viewsRouters.get("/realTimeProducts", async (req, res) => {
    try {
        const products = await manager.getList();
        res.render("realTimeProducts", { products });
    } catch (error) {
        res.status(400).send({ error: true, message: error.message });
    }
});
export default viewsRouters;
