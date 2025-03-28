import { AdModel } from "../models/products_model.js";
import { addAdValidator } from "../validators/validation.js";

export const addAd = async (req, res, next) => {
  try {
    console.log(req.file, req.files);
    //validate the product information
    const { error, value } = addAdValidator.validate(
      {
        ...req.body,
        image: req.files?.map((file) => {
          return file.filename;
        }),
      },
      {
        abortEarly: false,
      }
    );
    if (error) {
      return res.status(422).json(error.details[0].message);
    }
    //save product information in database
    const result = await AdModel.create({
      ...value,
      vendorId: req.auth.id,
    });
    //return response
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllAds = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;

    // Parse filter and sort parameters with error handling
    let parsedFilter, parsedSort;
    try {
      parsedFilter = JSON.parse(filter);
      parsedSort = JSON.parse(sort);
    } catch (parseError) {
      return res
        .status(400)
        .json({ error: "Invalid filter or sort query parameters." });
    }

    // Fetch products from the database
    const result = await AdModel.find(parsedFilter).sort(parsedSort);

    // Return response
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAd = async (req, res) => {
  const oneAd = await AdModel.findById(req.params.id);
  res.status(200).json({ advert: oneAd });
};

export const updateAd = async (req, res, next) => {
  try {
    const result = await AdModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ advert: result });
  } catch (error) {
    next(error);
  }
};

export const updatePartofAd = async (req, res, next) => {
  try {
    const result = await AdModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const deleteAd = async (req, res) => {
  const deleteAdById = await AdModel.findByIdAndDelete(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.send("deleted ad successfully");
};

export const getVendorAds = async (req, res) => {
  const getAds = await AdModel.find({
    vendorId: req.auth.id,
  });
  res.status(200).json(getAds);
};
