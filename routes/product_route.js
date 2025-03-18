import { Router } from "express";
import {
  addAd,
  deleteAd,
  getAd,
  getAllAds,
  updateAd,
  updatePartofAd,
} from "../controllers/products_controller.js";
import { adPicturesUpload } from "../middlewares/upload.js";

// create product router
const adRouter = Router();

//define routes
adRouter.post("/advert", adPicturesUpload.array("image", 3), addAd);

adRouter.get("/advert/:id", getAd);

adRouter.get("/advert", getAllAds);

adRouter.put("/advert/:id", adPicturesUpload.array("image", 3), updateAd);

adRouter.delete("/advert/:id", deleteAd);

adRouter.patch(
  "/advert/:id",
  adPicturesUpload.array("image", 3),
  updatePartofAd
);

//export router
export default adRouter;
