import fs from 'fs/promises';
import Cart from './cart.js';
import ProductCart from "./productCart.js";

export class CartManager {
    constructor(path) {
        this.path = path;
    }
    async #readFile() {
        try {
            const file = await fs.readFile(this.path, "utf8");
            return JSON.parse(file);
        } catch (error) {
            return await this.#writefile([]);
        }
    }
    async getCartById(cartId) {
        try {
            if (!/^\d+$/.test(cartId)) {
                throw new Error("ID INVALIDO");
            }
            const carts = await this.#readFile();
            const cart = carts.find(
                (element) => element.id === Number(cartId));
            if (!cart) {
                throw new Error("CARRITO NO EXISTENTE");
            }
            return cart.products;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async createCart() {
        try {
            const carts = await this.#readFile();
            const id = this.#setId(carts);
            const cart = new Cart(id, []);
            carts.push(cart);
            await this.#writefile(carts);
            return cart.id;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async addProductCart(cartId, idProduct) {
        try {
            if (!/^\d+$/.test(idProduct) || !/^\d+$/.test(cartId)) {
                throw new Error("ID INVALIDO");
            }
            const carts = await this.#readFile();
            const cartIndex = carts.findIndex(element => element.id === Number(cartId));
            if (cartIndex < 0){
                throw new Error("ID CART INEXISTENTE");
            }
            const cart = carts[cartIndex];
            const index = cart.products.findIndex(
                (element) => element.product === Number(idProduct));
            if (index >= 0) {
                carts[cartIndex].products[index].quantity =
                cart.products[index].quantity + 1;
            } else {
                const product = new ProductCart(Number(idProduct), 1);
                carts[cartIndex].products.push(product);
            }
            await this.#writefile(carts);
            return ('PRODUCTO INGRESADO CORRECTAMENTE')
        } catch (error) {
            throw new Error(error.message);
        }
    }
        #setId(carts) {
        const id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;
        return id;
    }
    async #writefile(data) {
        return await fs.writeFile(this.path, JSON.stringify(data));
    }
}