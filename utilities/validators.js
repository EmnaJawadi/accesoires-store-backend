const Joi = require("joi")

const ArticleValidator = Joi.object({
  designation: Joi.string().required().min(2).max(20),
  description: Joi.string().required(),
  photo: Joi.string(),
  price: Joi.number().required(),
  categorie: Joi.string().required()
});
const CategorieValidator = Joi.object({
  title: Joi.string().required().min(2).max(20),
  description: Joi.string().required()
});

const registerValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(4),
});

const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(4),
});

module.exports = { ArticleValidator, CategorieValidator, registerValidator, loginValidator };