import { model, Schema } from "mongoose";

const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
    },
    product_thumb: {
        type: String,
    },
    product_description: {
        type: String,
    },
    product_price: {
        type: Number,
    },
    product_quantity: {
        type: Number,
    },
    product_type: {
        type: String,
        enum: ['electronics', 'clothing', 'furniture', 'beauty', 'sports', 'toys', 'other'],
    },
    product_attributes: {
        type: Schema.Types.Mixed,
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
    },
    // ===========================


    product_category: {
        type: String,
    },
    product_brand: {
        type: String,
    },
    product_images: {
        type: [String],
    },
    product_videos: {
        type: [String],
    },
    product_reviews: {
        type: [String],
    },
    product_ratings: {
        type: [Number],
    },
    product_tags: {
        type: [String],
    },
    product_variants: {
        type: [String],
    },
    product_options: {
        type: [String],
    },
    product_variants: {
        type: [String],
    },
})

const clothingSchema = new Schema({
    brand: {
        type: String,
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
})

const electronicsSchema = new Schema({
    brand: {
        type: String,
    },
    model: {
        type: String,
    },
    color: {
        type: String,
    },
})

export default model(DOCUMENT_NAME, productSchema);
export const electronics = model('Electronics', electronicsSchema);
export const clothing = model('Clothing', clothingSchema);
// Polymorphic pattern
