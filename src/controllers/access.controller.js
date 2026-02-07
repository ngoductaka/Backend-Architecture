const { Created, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  async login(req, res) {
    const { name, email, password } = req.body;
    // 1. check mail in db 
    // 2. match password
    // 3. create access token, refresh token
    // 4. get user info
    new SuccessResponse({
      message: "Shop login successfully",
      metadata: await AccessService.login({ name, email, password }),
    }).send(res);
    
  }
  async signUp(req, res) {
    new Created({
      message: "Shop registered successfully",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  }
}

module.exports = new AccessController();
