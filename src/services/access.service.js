const authUtils = require("../auth/auth_utils");
const KeyTokenService = require("./key.token.service");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptography = require('crypto');
const shopModel = require("../models/shop.model");
const ROLE_SHOP = {
    SHOP: 'SHOP',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
    WRITER: 'WRITER'
}
class AccessService {
    // Other methods...
    static async signUp({ name, email, password }) {
        try {
            const shop = await shopModel.findOne({ email }).lean();
            if (shop) {
                return {
                    message: 'Email already in use',
                    code: '1000',
                    status: 'error'
                }
            }
            const passwordHash = await bcrypt.hash(password, 10); // In real application, hash the password
            const newShop = await shopModel.create({ name, email, password: passwordHash, role: ROLE_SHOP.SHOP });
            if (newShop) {

                const { publicKey, privateKey } = cryptography.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'spki',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs8',
                        format: 'pem',
                        cipher: 'aes-256-cbc',
                        passphrase: ''
                    }
                });

                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey: publicKey
                });

                if (!publicKeyString) {
                    return {
                        message: 'Error generating key token',
                        code: '1002',
                        status: 'error'
                    }
                }

                const tokens = await authUtils.createTokenPare({
                    payload: { shopId: newShop._id, email },
                    publicKey: publicKeyString,
                    privateKey: privateKey
                });
                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens,
                    }
                }
                console.log('pare key', { publicKey, privateKey });
            }

            return {
                message: 'Shop registered successfully',
                code: '1001',
                status: 'success'
            }
        } catch (error) {
            return {
                message: error.message,
                code: '1000',
                status: 'error'
            }
        }
    }
}

module.exports = AccessService;