const Joi = require('joi');
const joiErrors = require('../domains/helpers/joiErrors');

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  userId: Joi.string().required(),
}).messages({
  'string.empty': joiErrors.empty,
});

const updateTaskSchema = Joi.object({
  taskId: Joi.string().required(),
  userId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
}).messages({
  'string.empty': joiErrors.empty,
});

module.exports = {
  taskValidator: (product) => taskSchema.validate(product),
  updateTaskValidator: (payload) => updateTaskSchema.validate(payload),
};
