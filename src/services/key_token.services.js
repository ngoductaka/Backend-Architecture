import KeyTokenModel from "../models/key_token.model.js";

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshTokens,
  }) => {
    try {
      const filter = { user: userId };
      const update = {
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshTokens,
      };
      const options = { upsert: true, new: true };

      const tokens = await KeyTokenModel.findOneAndUpdate(
        filter,
        update,
        options,
      );
      return tokens.publicKey;
    } catch (error) {
      throw new Error(error);
    }
  };

  static findByUserId = async (userId) => {
    return await KeyTokenModel.findOne({ user: userId }).lean();
  };

  static removeKeyById = async (id) => {
    return await KeyTokenModel.findByIdAndDelete(id);
  };

  static removeByUserId = async (userId) => {
    return await KeyTokenModel.deleteMany({ user: userId });
  };

  static findByRefreshTokenUsed = async (refreshToken) => {
    return await KeyTokenModel.findOne({
      refreshTokensUsed: refreshToken,
    }).lean();
  };
  static findByRefreshToken = async (refreshToken) => {
    return await KeyTokenModel.findOne({
      refreshToken: refreshToken,
    }).lean();
  };
}

export default KeyTokenService;
