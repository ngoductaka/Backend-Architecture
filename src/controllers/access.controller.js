import { Created, SuccessResponse } from "../core/success.response.js";
import AccessService from "../services/access.service.js";

class AccessController {
  async login(req, res) {
    console.log("Login request body:", req.body);
    const { name, email, password } = req.body;
    // 1. check mail in db
    // 2. match password
    // 3. create access token, refresh token
    // 4. get user info
    new SuccessResponse({
      message: "Shop login successfully",
      metadata: await AccessService.login({ name, email, password }),
      statusCode: 200,
    }).send(res);
  }
  async signUp(req, res) {
    new Created({
      message: "Shop registered successfully",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  }
  async logout(req, res) {
    const { keyStore } = req;
    await AccessService.logout({ keyStore });
    new SuccessResponse({
      message: "Shop logged out successfully",
      statusCode: 200,
    }).send(res);
  }
}

export default new AccessController();
