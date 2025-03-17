import { ProductModel } from "../models/products_model.js";
import { addProductValidator } from "../validators/validation.js";

export const addProduct = async (req, res, next) => {
  try {
    console.log(req.file, req.files);
    //validate the product information
    const { error, value } = addProductValidator.validate(
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
    const result = await ProductModel.create(value);
    //return response
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}" } = req.query;
    //ferch products from database
    const result = await ProductModel.find(JSON.parse(filter)).sort(
      JSON.parse(sort)
    );
    //return response
    res.json(result);
  } catch (error) {
    next(error);
  }
};
export const getProduct = async (req, res) => {
  const oneProduct = await ProductModel.findById(req.params.id);
  res.status(200).json({ product: oneProduct });
};

export const updateProduct = async (req, res, next) => {
  try {
    const result = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (req, res) => {
  const deleteProduct = await ProductModel.findByIdAndDelete(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.send("deleted product successfully");
};
