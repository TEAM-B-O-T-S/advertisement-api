import { Router } from "express";
import {
  addProduct,
  deleteProductById,
  getProducts,
  updateProduct,
} from "../controllers/products_controller.js";
import { productPicturesUpload } from "../middlewares/upload.js";

// create product router
const productsRouter = Router();

//define routes
productsRouter.post(
  "/products",
  productPicturesUpload.array("image", 3),
  addProduct
);

productsRouter.get("/products", getProducts);

productsRouter.put("/products/:id", updateProduct);

productsRouter.delete("/products/:id", deleteProductById);

//export router
export default productsRouter;
