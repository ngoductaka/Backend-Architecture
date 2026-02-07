// const shopModel = require('../models/shop.model');
// const shopModel = require('../models/shop.model');
import shopModel from '../models/shop.model.js';

export const findByEmail = async (email) => {
    return await shopModel.findOne({ email }).lean();
}