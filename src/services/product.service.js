import product, { clothing, electronics } from "../models/product.model.js";
import { SuccessResponse } from "../core/success.response.js";
import { ErrorResponse } from "../core/error.response.js";

class ProductFactory {
  static productRegistry = {};

  static registerProductType(type, classRef) {
    this.productRegistry[type] = classRef;
  }
  static createProduct(type, data) {
    console.log("Creating product with type:", type, "and data:", data);
    const ProductClass = this.productRegistry[type];
    if (!ProductClass) {
      throw new SuccessResponse("Invalid product type", 400);
    }
    return new ProductClass(data).createProduct();
  }
}
export class Product {
  constructor({
    product_shop,
    product_attributes,
    product_name = "",
    product_thumb,
    product_price = 0,
    product_quantity,
    product_type,
    product_description = "",
  }) {
    this.product_shop = product_shop;
    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_description = product_description;
    this.product_attributes = product_attributes;
  }
  async createProduct(product_id) {
    return await product.create({ ...this, _id: product_id });
  }
}

export class Clothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create(this.product_attributes);
    if (!newClothing)
      throw new ErrorResponse("Failed to create clothing attributes", 400);
    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct)
      throw new ErrorResponse("Failed to create newProduct attributes", 400);

    return newProduct;
  }
}

export class Electronics extends Product {
  async createProduct() {
    const newElectronics = await electronics.create(this.product_attributes);
    if (!newElectronics)
      throw new ErrorResponse("Failed to create electronics attributes", 400);
    const newProduct = await super.createProduct(newElectronics._id);
    if (!newProduct)
      throw new ErrorResponse("Failed to create newProduct attributes", 400);

    return newProduct;
  }
}
export class Furniture extends Product {
  async createProduct() {
    const newFurniture = await furniture.create(this.product_attributes);
    if (!newFurniture)
      throw new ErrorResponse("Failed to create furniture attributes", 400);
    const newProduct = await super.createProduct(newFurniture._id);
    if (!newProduct)
      throw new ErrorResponse("Failed to create newProduct attributes", 400);

    return newProduct;
  }
}
// register product types
ProductFactory.registerProductType("clothing", Clothing);
ProductFactory.registerProductType("electronics", Electronics);
ProductFactory.registerProductType("furniture", Furniture);
export default ProductFactory;
