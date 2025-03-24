import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { multerSaveFilesOrg } from "multer-savefilesorg";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const adPicturesUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "/advertisement-api/advert-images",
    },
  }),
});

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

// export const adPicturesUpload = multer({
//   storage: multerSaveFilesOrg({
//     apiAccessToken: process.env.SAVEFILESORG_API_KEY,
//     relativePath: "/advert-api/product-pictures/*",

//     //* means let the files go into a folder
//   }),
// });
