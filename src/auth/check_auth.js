import { findByKey } from '../services/api_key.service.js';

const HEADERS = {
    AUTHORIZATION: 'Authorization',
    CONTENT_TYPE: 'Content-Type',
    ACCEPT: 'Accept',
    API_KEY: 'x-api-key',
};

export const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADERS.API_KEY]?.toString();
        if (!key) {
            return res.status(401).json({ message: 'API key is missing' });
        }

        // Assuming ApiKeyModel is imported and available
        const apiKeyRecord = await findByKey(key);
        if (!apiKeyRecord) {
            return res.status(403).json({ message: 'Invalid or inactive API key' });
        }

        req.objectKey = apiKeyRecord;
        return next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }

}

export const permissions = async (permission) => {
    // To be implemented
    return (req, res, next) => {
        if (!req.objectKey.permissions) {
            return res.status(403).json({ message: 'No permissions found for this API key' });
        }
        req.objectKey.permissions.includes(permission) ? next() : res.status(403).json({ message: 'Insufficient permissions' });
    };
}
