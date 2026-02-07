import jwt from 'jsonwebtoken';
import cryptography from 'crypto';

export const createTokenPare = async ({ payload, publicKey, privateKey }) => {

    try {
        // Create JWT token
        const accessToken = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1d' });
        const refreshToken = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '7d' });

        jwt.verify(accessToken, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err);
            } else {
                console.log('Decoded token payload:', decoded);
            }
        });
        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Error creating token pair:', error);
        return null;
    }

}

export const createRSAKeyPair = () => {
    try {
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
        return { publicKey, privateKey };
    } catch (error) {
        console.error('Error generating RSA key pair:', error);
        return null;
    }

}
