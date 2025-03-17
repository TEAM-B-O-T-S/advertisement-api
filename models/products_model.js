import { Schema, model, modelNames } from "mongoose";
import normalize from "normalize-mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: [{ type: String, required: true }],
    price: { type: Number, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(normalize);
export const ProductModel = model("Product", productSchema);
