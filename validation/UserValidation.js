const Joi = require('joi');

const userValidate = Joi.object({
    name: Joi.string().trim().required().min(8).max(255).messages({
        'string.base': `Name must be a string`,
        'string.empty': `Name cannot be empty`,
        'string.min': `Name should have a minimum length of {#limit}`,
        'string.max': `Name should have a maximum length of {#limit}`,
        'any.required': `Name is required`,
      }),
    email: Joi.string().trim().required().email().messages({
        'string.base': `Email must be a string`,
        'string.empty': `Email cannot be empty`,
        'string.email': `Email must be a valid email address`,
        'any.required': `Email is required`,
      }),
      password: Joi.string()
      .min(8)
      .max(30)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
      .required()
      .messages({
        'string.base': `Password must be a string`,
        'string.empty': `Password cannot be empty`,
        'string.min': `Password should have a minimum length of {#limit}`,
        'string.max': `Password should have a maximum length of {#limit}`,
        'string.pattern.base': `Password must include at least one uppercase letter, one lowercase letter, one number, and one special character`,
        'any.required': `Password is required`,
      }),
})

module.exports = userValidate