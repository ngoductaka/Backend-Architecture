const bcrypt = require("bcrypt");
const lodash = require("lodash");

const shopModel = require("../models/shop.model");
const authUtils = require("../auth/auth_utils");
const KeyTokenService = require("./key_token.services");
const { ConflictError } = require("../core/error.response");
const ROLE_SHOP = {
  SHOP: "SHOP",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
  WRITER: "WRITER",
};
class AccessService {
  // Other methods...
  static async signUp({ name, email, password }) {
    const shop = await shopModel.findOne({ email }).lean();
    if (shop) {
      console.log("Shop already exists with this email");
      throw new ConflictError("Email already in use");
    }
    const passwordHash = await bcrypt.hash(password, 10); // In real application, hash the password
    const newShop = await shopModel.create({
      name,
      email,
      password: passwordHash,
      role: ROLE_SHOP.SHOP,
    });
    if (newShop) {
      const { publicKey, privateKey } = authUtils.createRSAKeyPair();
      console.log({ publicKey, privateKey });
      const publicKeyString = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey: publicKey,
      });

      if (!publicKeyString) {
        return {
          message: "Error generating key token",
          code: "1002",
          status: "error",
        };
      }

      const tokens = await authUtils.createTokenPare({
        payload: { shopId: newShop._id, email },
        publicKey: publicKeyString,
        privateKey: privateKey,
      });
      console.log("pare key", { publicKey, privateKey });
      return {
        code: 201,
        metadata: {
          shop: lodash.omit(newShop, ["password", "__v"]),
          tokens,
        },
      };
    }

    return {
      message: "Shop registered successfully",
      code: "1001",
      status: "success",
    };
  }
}

module.exports = AccessService;
