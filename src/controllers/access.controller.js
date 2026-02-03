const { Created } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  login(req, res) {
    const { name, email, password } = req.body;
    // Here you would normally validate the username and password
    if (username === "testuser" && password === "testpassword") {
      return res
        .status(200)
        .json({ message: "Login successful", token: "fake-jwt-token" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  }
  async signUp(req, res) {
    new Created({
      message: "Shop registered successfully",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  }
}

module.exports = new AccessController();
