import jwt from "jsonwebtoken";
import cryptography, { verify } from "crypto";
import { asyncHandler } from "../helper/asyncHandler.js";
import { HEADER } from "../const/const.js";
import { ErrorResponse } from "../core/error.response.js";
import KeyTokenService from "../services/key_token.services.js";

export const createTokenPair = async ({ payload, publicKey, privateKey }) => {
  try {
    // Create JWT token
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7d",
    });

    jwt.verify(
      accessToken,
      publicKey,
      { algorithms: ["RS256"] },
      (err, decoded) => {
        if (err) {
          console.error("Token verification failed:", err);
        } else {
          console.log("Decoded token payload:", decoded);
        }
      },
    );
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error creating token pair:", error);
    return null;
  }
};

export const createRSAKeyPair = () => {
  try {
    const { publicKey, privateKey } = cryptography.generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    return { publicKey, privateKey };
  } catch (error) {
    console.error("Error generating RSA key pair:", error);
    return null;
  }
};

export const authentication = asyncHandler(async (req, res, next) => {
  // 1 check useID missing
  // 2 get accessToken from header
  // 3 verify accessToken
  // 4 check user in db
  // 5 check keyStore with userId
  // 6 if ok next
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) {
    throw new ErrorResponse("Client ID missing", 400);
  }
  const authHeader = req.headers[HEADER.AUTHORIZATION];
  if (!authHeader) {
    throw new ErrorResponse("Authorization header missing", 400);
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new ErrorResponse("Token missing", 400);
  }
  const { privateKey, _id } = await KeyTokenService.findByUserId(userId);
  if (!privateKey) {
    throw new ErrorResponse("Public key not found for user", 400);
  }
  try {
    const decoded = await jwt.verify(token, privateKey, {
      algorithms: ["RS256"],
    });
    console.log("Decoded token:", decoded);
    if (!decoded || decoded.shopId !== userId) {
      throw new ErrorResponse("Invalid token payload", 403);
    }
    req.user = decoded;
    req.keyStore = _id;
    return next();
  } catch (error) {
    console.error("Token verification error:", error);
    throw new ErrorResponse("Invalid token", 403);
  }
});
