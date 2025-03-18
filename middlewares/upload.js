import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const remoteUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/advert-api/*",

    //* means let the files go into a folder
  }),
});

export const adImageUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/advert-api/product-images/*",

    //* means let the files go into a folder
  }),
});

export const adPicturesUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/advert-api/product-pictures/*",

    //* means let the files go into a folder
  }),
});
