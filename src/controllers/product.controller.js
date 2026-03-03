import { Created, SuccessResponse } from "../core/success.response.js";
import ProductService from "../services/product.service.js";

class ProductController {
  async createProduct(req, res) {
    new SuccessResponse({
      message: "Product created successfully",
      metadata: await ProductService.createProduct(req.body.product_type, req.body),
      statusCode: 200,
    }).send(res);
  }
}

export default new ProductController();
