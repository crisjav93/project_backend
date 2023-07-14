import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const manager = new ProductManager('./db/products.json');
const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await manager.getList(limit);
        res.send({ status: "success", playload: products });
    } catch (error) {
        res.status(400).send({ error: true, message: error.message });
    }
});

productsRouter.get("/:pId", async (req, res) => {
    try {
        const { pId } = req.params;
        const product = await manager.getProductById(pId);
        res.send({ status: "success", playload: product });
    } catch (error) {
        res.status(400).send({ error: true, message: error.message });
    }
});

productsRouter.post("/", async (req, res) => {
    try {
        const { body } = req;
        const message = await manager.addProduct(body);
        res.send({ status: "success", message: message });
    } catch (error) {
        res.status(400).send({ error: true, message: error.message });
    }
});

productsRouter.put("/:pId", async (req, res) => {
    try {
        const { pId } = req.params;
        const { body } = req;
        res.send({
            status: "success",
            message: await manager.updateProduct(pId, body),
        });
    } catch (error) {
        res.status(400).send({ error: true, message: error.message });
    }
});

productsRouter.delete("/:pId", async (req, res) => {
    try {
        const { pId } = req.params;
        res.send({
            status: "success",
            message: await manager.deleteProduct(pId),
        });
    } catch (error) {
        res.status(400).send({ error: true, message: error.message });
    }
});

export default productsRouter;