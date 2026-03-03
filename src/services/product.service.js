import product, { clothing, electronics } from '../models/product.model.js';
import { SuccessResponse } from '../core/success.response.js';

class ProductFactory {
    static createProduct(type, data) {
        console.log("Creating product with type:", type, "and data:", data);
        switch (type) {
            case 'clothing':
                return new Clothing(data).createProduct();
            case 'electronics':
                return new Electronics(data).createProduct(data);
            default:
                throw new SuccessResponse('Invalid product type', 400);
        }
    }
}
export class Product {
    constructor({ product_shop, product_attributes, product_name = '', product_thumb, product_price = 0, product_quantity, product_type, product_description = '' }) {
        this.product_shop = product_shop;
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_description = product_description;
        this.product_attributes = product_attributes;
    }
    async createProduct() {
        return await product.create(this);
    }
}

export class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create(this.product_attributes);
        if(!newClothing) throw new SuccessResponse('Failed to create clothing attributes', 400);
        const newProduct = await super.createProduct();
        if(!newProduct) throw new SuccessResponse('Failed to create newProduct attributes', 400);

        return newProduct;
    }
}

export class Electronics extends Product {
    async createProduct() {
        const newElectronics = await electronics.create(this.product_attributes);
        if(!newElectronics) throw new SuccessResponse('Failed to create electronics attributes', 400);
        const newProduct = await super.createProduct();
        if(!newProduct) throw new SuccessResponse('Failed to create newProduct attributes', 400);

        return newProduct;
    }
}
export default ProductFactory;