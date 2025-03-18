import Joi from "joi";

export const addAdValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.array().items(Joi.string().required()),
  price: Joi.number().required(),
  category: Joi.string().required(),
});
