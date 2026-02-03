const ApiKeyModel = require('../models/api_key.model');


const findByKey = async (key) => {
    // Assuming ApiKeyModel is imported and available

    // ApiKeyModel.create({
    //     key: 'mysecretkey',
    //     status: true,
    //     permissions: ['111'],
    // });
    return await ApiKeyModel.findOne({ key, status: true }).lean();
};


module.exports = {
    findByKey,
};