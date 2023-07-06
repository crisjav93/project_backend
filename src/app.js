import express from "express";
import { ProductManager } from './ProductManager.js'

const manager = new ProductManager ("../products.json");
const app = express();
app.use(express.urlencoded({ extended:true })); //* se encarga de transformar los datos del req
app.use(express.json()); //* se encarga de transformar los datos ingresados en .json

app.get("/products", (async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await manager.getList(limit);
    res.send({ status: 'success', playload: products });
  } catch (error) {
    res.status(400).send({ error: true, message: error.message });
  }
}));

app.get('/products/:pId', async (req, res) => {
  try {
    const { pId } = req.params;
    const product = await manager.getProductById(pId);
    res.send({ status: 'success', playload: product });
  } catch (error) {
    res.status(400).send({ error: true, message: error.message});
  }
});

app.post('/products', async (req, res) => {
  try {
    const { body } = req;
    const message = await manager.addProduct(body);
    res.send({ status: 'success', message: message,});
  } catch (error) {
    res.status(400).send ({ error: true, message: error. message});
  }
});

app.put('/products/:pId', async (req, res) => {
  try {
    const { pId } = req.params;
    const { body } = req;
    res.send({ status: 'success', message: await manager.updateProduct(pId, ...body),});
  } catch (error) {
    res.status(400).send({ error: true, message: error.message });
  }
})

app.delete('/products/:pId', async (req, res) => {
  try {
    const { pId} = req.params;
    res.send({ status: 'success' , message: await manager.deleteProduct(pId),});
  } catch (error) {
      res.status(400).send({ error: true, message: error.message });

  }
})

app.listen(8080, () => {
    console.log("estoy escuhando para el servicio");
});
