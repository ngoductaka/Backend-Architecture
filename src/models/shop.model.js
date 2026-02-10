import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";

const shopSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
      trim: true,
      maxLength: 500,
    },
    phoneNumber: {
      type: String,
      required: false,
      trim: true,
      maxLength: 20,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["SHOP", "EDITOR", "ADMIN", "WRITER"],
      default: "SHOP",
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export default model(DOCUMENT_NAME, shopSchema);
