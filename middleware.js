const { v4: uuidv4 } = require('uuid');
const { CustomError } = require('./utils/CustomError');
const inventoryItemSchema = require('./model/inventory');
const warehouseSchema = require('./model/warehouse');

module.exports.validateInventoryItem = (req, res, next) => {
  //Create a new object with id and the data from request body
  const newInventoryItem = {
    id: req.params.id ? req.params.id : uuidv4(),
    ...req.body,
    status: Number(req.body.quantity) > 0 ? 'In Stock' : 'Out of Stock',
    quantity: Number(req.body.quantity),
  };
  //Validated the newly created object
  const { error, value } = inventoryItemSchema.validate(newInventoryItem, {
    abortEarly: false,
  });
  //If the is validation error, throw error
  if (error) {
    const errorArray = error.details.map((errMsg) => errMsg.message).join(', ');
    throw new CustomError(400, `Please provide valid inputs: ${errorArray}`);
  }
  //If the object passed validation, add the object to the request for controller to use it
  req.validatedData = value;
  next();
};

module.exports.validateWarehouse = (req, res, next) => {
  //Create a new object with id and the data from request body
  const newWarehouseItem = {
    id: req.params.id ? req.params.id : uuidv4(),
    ...req.body,
  };
  //Validated the newly created object
  const { error, value } = warehouseSchema.validate(newWarehouseItem, {
    abortEarly: false,
  });
  //If the is validation error, throw error
  if (error) {
    const errorArray = error.details.map((errMsg) => errMsg.message).join(', ');
    throw new CustomError(400, `Please provide valid inputs: ${errorArray}`);
  }
  //If the object passed validation, add the object to the request for controller to use it
  req.validatedData = value;
  next();
};
