import fs from "fs/promises";
import Product from './products.js';

//CREAR DE UN  PRODUCTO
export class ProductManager {
    #idNumer = 0; //ID
    #borreUltimo = false;
    constructor(path) {
        this.path = path;
    }

    async #getProducts() {
        try {
            const file = await fs.readFile(this.path, "utf8");
            return JSON.parse(file);
        } catch (e) {
            return await this.#writeFile([]);
        }
    }

    async getList(limit) {
        try {
            const products = await this.#getProducts();
            return limit ? this.#isLimit(products, limit) : products;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async addProduct(dates) {
        try {
            const products = await this.#getProducts();
            if (this.#valueProperties(body)) {
                throw new Error("ERROR EN LOS DATOS INGRESADOS");
            }
            if (this.#validateCode(dates.code, products)) {
                throw new Error("Codigo Repetido , ingrese otro codigo");
            } else {
                this.#setId(products);
                //* ver error en clase Product
                const product = {id:this.#idNumer, ...dates};
                products.push(product);
                await this.#writeFile(products);
                return "CREADO CORRECAMENTE";
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductById(idProducto) {
        try {
            if (!/^\d+$/.test(idProducto)) {
                throw new Error("ID INVALIDO");
            }
            const products = await this.#getProducts();
            const product = products.find(
                (element) => element.id === Number(idProducto)
            );
            if (!product) {
                throw new Error("PRODUCTO NO EXISTE");
            }
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    #valueProperties(object) {
        const datos = [
            "title",
            "descrition",
            "price",
            "thumbnail",
            "code",
            "stock",
        ];
        datos.forEach(element => {
            if (!(element in object)) {
            return true;
        }
        })
        if (Object.keys(object).length !== 6) {
            return true; // validamos que cuente con los datos requeridos.
        }
        return false;
    };
    
    async updateProduct(id, body) {
        try { 
            const products = await this.#getProducts();
            if (!/^\d+$/.test(id)) {
                throw new Error("ID INVALIDO");
            }
            if (this.#valueProperties(body)) {
                throw new Error("ERROR EN LOS DATOS INGRESADOS");
            }
            const index = products.findIndex((element) => element.id === Number(id));
            if (index > 0) {
                products[index] = {id, ...body};
                await this.#writeFile(products);
                return "MODIFICADO CORRECTAMENTE";
            } else {
                throw new Error("ID NO EXISTE");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteProduct(idProducto) {
        try {
            if (!/^\d+$/.test(idProducto)) {
                throw new Error("ID INVALIDO");
            }
            const products = await this.#getProducts(); // traer los archivos
            this.#controllerId(products, idProducto);
            const productsFilter = products.filter(
                (elemnt) => elemnt.id !== Number(idProducto)
            );
            if (JSON.stringify(products) === JSON.stringify(productsFilter)) {
                throw new Error("ID NO EXISTE");
            } else {
                await this.#writeFile(productsFilter);
                return "SE BORRO CORRECTAMENTE";
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    #isLimit(products, limit) {
        try {
            // if (typeof limit === "string") {
            //   throw new Error("ERROR NO ES UN NUMERO");
            // }
            if (products.length < limit) {
                throw new Error(`ERROR , LIMITE MAXIMO ${products.length}`);
            }
            return products.slice(0, limit);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async #writeFile(dato) {
        try {
            return await fs.writeFile(this.path, JSON.stringify(dato));
        } catch (error) {
            throw new Error("Error en la lectura de memoria");
        }
    }

    #controllerId(list, idProducto) {
        if (list[list.length - 1].id === Number(idProducto)) {
            this.#idNumer = Number(idProducto);
            this.#borreUltimo = true;
        }
    }
    #setId(list) {
        if (!this.#borreUltimo) {
            this.#idNumer =
                list.length === 0 ? 1 : list[list.length - 1].id + 1;
        } else {
            this.#idNumer++;
            this.#borreUltimo = false;
        }
    }
    #validateCode(code, list) {
        return list.find((elemnt) => elemnt.code === code) ? true : false;
    }
}
