const Joi = require('joi');

//Inventory item schema - validation
const inventoryItemSchema = Joi.object().keys({
  id: Joi.string().trim().required(),
  warehouseID: Joi.string().trim().required(),
  warehouseName: Joi.string().trim().required(),
  itemName: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  quantity: Joi.number().min(0).required(),
  category: Joi.string()
    .trim()
    .valid('Electronics', 'Gear', 'Apparel', 'Accessories', 'Health')
    .required(),
  status: Joi.string().trim().valid('Out of Stock', 'In Stock').required(),
});

module.exports = inventoryItemSchema;
