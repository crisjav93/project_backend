import { Router } from "express";
import { CartManager } from '../cartManager.js';

const manager = new CartManager("./db/carts.json");
const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
  try {
    const idCart = await manager.createCart();
    res.send({ status: "success", payload: idCart });
  } catch (error) {
    res.status(400).send({ error: true, message: error.message });
  }
})

cartsRouter.get("/:cId", async (req, res) => {
  try {
    const { cId } = req.params;
    const products = await manager.getCartById(cId);
    res.send({ status: "success", playload: products });
  } catch (error) {
    res.status(400).send({ error: true, message: error.message });
  }
});

cartsRouter.post("/:cId/product/:pId", async (req, res) => {
    try {
        const { cId, pId } = req.params;
        const message = await manager.addProductCart(cId, pId);
        res.send({ status: "success", message: message });
    } catch (error) {
        res.status(400).send({ error: true, message: error.message });
    }
});

export default cartsRouter;