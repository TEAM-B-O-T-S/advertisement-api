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
import { authorize } from "../middlewares/authz.js";
import { auth } from "../middlewares/auth.js";

// create product router
const adRouter = Router();

//define routes
adRouter.post("/advert",auth, adPicturesUpload.array("image", 3), authorize(['vendor']), addAd);

adRouter.get("/advert/:id",auth, authorize(['user', 'vendor']), getAd);

adRouter.get("/advert",auth,authorize(['user']), getAllAds);

adRouter.put("/advert/:id",auth, adPicturesUpload.array("image", 3),authorize([ 'vendor']), updateAd);

adRouter.delete("/advert/:id",auth,authorize(['vendor']), deleteAd);

adRouter.patch(
  "/advert/:id",
  adPicturesUpload.array("image", 3),
  authorize(['vendor']),
  updatePartofAd
);

//export router
export default adRouter;
