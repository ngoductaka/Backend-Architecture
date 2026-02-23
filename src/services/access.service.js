import { findByEmail } from "./shop.services.js";
import { createRSAKeyPair, createTokenPair } from "../auth/auth_utils.js";
import bcrypt from "bcrypt";
import { verifyToken } from "../auth/auth_utils.js";
import lodash from "lodash";
import shopModel from "../models/shop.model.js";
import KeyTokenService from "./key_token.services.js";
import { ConflictError, BadRequestError } from "../core/error.response.js";

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
      const { publicKey, privateKey } = createRSAKeyPair();
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

      const tokens = await createTokenPair({
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
  static async login({ email, password }) {
    const shop = await findByEmail(email);

    if (!shop) {
      throw new BadRequestError("Shop not registered");
    }

    const match = await bcrypt.compare(password, shop.password);
    if (!match) {
      throw new BadRequestError("Password is incorrect");
    }
    const { publicKey, privateKey } = createRSAKeyPair();
    const tokens = await createTokenPair({
      payload: { shopId: shop._id, email },
      publicKey: publicKey,
      privateKey: privateKey,
    });

    const publicKeyString = await KeyTokenService.createKeyToken({
      userId: shop._id,
      publicKey: publicKey,
      privateKey: privateKey,
      refreshTokens: tokens.refreshToken,
    });

    return {
      shop: lodash.omit(shop, ["password", "__v"]),
      tokens,
    };
  }

  static async logout({ keyStore }) {
    return await KeyTokenService.removeKeyById(keyStore);
  }

  static async handleRefreshToken({ refreshToken, userId }) {
    // check token used
    // check refresh token exist in db
    const foundedToken =
      await KeyTokenService.findByRefreshTokenUsed(refreshToken);
    if (foundedToken) {
      await KeyTokenService.removeByUserId(userId);
      throw new BadRequestError(
        "Something wrong happened. Please login again",
        403,
      );
    }

    const holderToken = await KeyTokenService.findByRefreshToken(refreshToken);
    if (!holderToken) {
      throw new BadRequestError("Shop not registered", 403);
    }

    const { userId, email } = await verifyToken(
      refreshToken,
      holderToken.publicKey,
    );
  }
}

export default AccessService;
