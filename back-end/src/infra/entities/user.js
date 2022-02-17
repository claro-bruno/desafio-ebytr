const Joi = require('joi');
const joiErrors = require('../domains/helpers/joiErrors');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().max(20).required(),
}).messages({
  'string.empty': joiErrors.empty,
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).messages({
  'string.empty': joiErrors.empty,
});

// const updateUserSchema = Joi.object({
//   id: Joi.string().required(),
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   role: Joi.string().max(20).required(),
// }).messages({
//   'string.empty': joiErrors.empty,
// });

module.exports = {
  userValidator: (user) => userSchema.validate(user),
  loginUserValidator: (payload) => userLoginSchema.validate(payload),
};
