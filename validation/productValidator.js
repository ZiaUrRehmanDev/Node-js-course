const Joi = require('joi');

const productValidate = Joi.object({
  name: Joi.string().trim().required().max(255).messages({
    'string.base': `Product name must be a string`,
    'string.empty': `Product name cannot be empty`,
    'string.max': `Product name should have a maximum length of {#limit}`,
    'any.required': `Product name is required`,
  }),
  price: Joi.number().positive().precision(2).required().messages({
    'number.base': `Price must be a number`,
    'number.positive': `Price must be a positive number`,
    'number.precision': `Price must have at most 2 decimal places`,
    'any.required': `Price is required`,
  }),
  category: Joi.string().trim().required().messages({
    'string.base': `Category must be a string`,
    'string.empty': `Category cannot be empty`,
    'any.required': `Category is required`,
  }),
  description: Joi.string().trim().optional().max(1000).messages({
    'string.base': `Description must be a string`,
    'string.max': `Description should have a maximum length of {#limit}`,
  }),
  stock: Joi.number().integer().min(0).required().messages({
    'number.base': `Stock must be a number`,
    'number.integer': `Stock must be an integer`,
    'number.min': `Stock cannot be less than {#limit}`,
    'any.required': `Stock is required`,
  }),
  isAvailable: Joi.boolean().optional().messages({
    'boolean.base': `Availability must be a boolean value`,
  }),
  tags: Joi.array().items(Joi.string().trim().max(50)).optional().messages({
    'array.base': `Tags must be an array`,
    'string.base': `Each tag must be a string`,
    'string.max': `Each tag should have a maximum length of {#limit}`,
  }),
});

module.exports = productValidate;
