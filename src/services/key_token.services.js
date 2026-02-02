const KeyTokenModel = require("../models/key_token.model");

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey }) => {
        try {

            const publicKeyString = publicKey.toString();
            const keyToken = await KeyTokenModel.create({
                user: userId,
                publicKey: publicKeyString,
            });
            return keyToken ? publicKeyString : null;
        } catch (error) {
            throw new Error(error);
        }
    };
}

module.exports = KeyTokenService;
