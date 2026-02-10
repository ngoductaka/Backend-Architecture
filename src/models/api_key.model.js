import { Schema, model } from "mongoose";

const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";

const apiKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      required: true,
      enum: ["000", "100", "110", "111"],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);

export default model(DOCUMENT_NAME, apiKeySchema);
