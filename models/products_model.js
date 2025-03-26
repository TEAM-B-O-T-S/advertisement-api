import { Schema, Types, model, modelNames } from "mongoose";
import normalize from "normalize-mongoose";

const adSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: [{ type: String, required: true }],
    price: { type: Number, required: true },
    category: { type: String, required: true },
    vendorId: { type: Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

adSchema.plugin(normalize);
export const AdModel = model("Advert", adSchema);
