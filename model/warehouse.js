const Joi = require('joi');

const phoneReg =
  /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const contactSchema = Joi.object().keys({
  name: Joi.string().trim().required(),
  position: Joi.string().trim().required(),
  phone: Joi.string().trim().regex(RegExp(phoneReg)).required().messages({
    'string.pattern.base': 'US or Canadian phone number',
  }),
  email: Joi.string().email().required(),
});

//Warehouse schema - validation
const warehouseSchema = Joi.object().keys({
  id: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  city: Joi.string().trim().required(),
  country: Joi.string().trim().required(),
  contact: contactSchema,
});

module.exports = warehouseSchema;
