const KeyTokenModel = require("../models/key_token.model");

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey }) => {
        try {
            // const publicKeyString = publicKey.toString();
            // const keyToken = await KeyTokenModel.create({
            //     user: userId,
            //     publicKey: publicKeyString,
            // });
            // return keyToken ? publicKeyString : null;
            const filter = { user: userId };
            const update = { publicKey, privateKey, refreshTokensUsed: [], refreshTokens };
            const options = { upsert: true, new: true };

            const tokens = await KeyTokenModel.findOneAndUpdate(
                { user: userId },
                { publicKey: publicKey },
                { new: true, upsert: true }
            );
            return tokens.publicKey;
        } catch (error) {
            throw new Error(error);
        }
    };
}

module.exports = KeyTokenService;
