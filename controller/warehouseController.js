const { v4: uuidv4 } = require('uuid');
const warehouseJSON = require('path').join(__dirname, '../data/warehouse.json');
const inventoryJSON = require('path').join(__dirname, '../data/inventory.json');
const { asyncWrapper } = require('../utils/asyncErrorCatcher');
const { validiateWarehouse } = require('../model/warehouse');
const {
  readData,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  insertInto,
} = require('../utils/modifyDatabase');

//Get - retrieve a list of warehouses
const getWarehouses = asyncWrapper(async (req, res, next) => {
  return res.status(200).json({ data: await readData(warehouseJSON) });
});

//Get - retrieve a warehouse
const getWarehouse = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const foundWarehouse = await findById(warehouseJSON, id);
  //If can't find a warehouse with the same id, pass error
  if (!foundWarehouse) {
    return next({
      errorMessage: `Can't find the warehouse associated with this id.`,
      statusCode: 404,
    });
  }
  return res.status(200).json({ data: foundWarehouse });
});

//Post - add a new warehouse
const createWarehouse = asyncWrapper(async (req, res, next) => {
  //If the object failed the validation
  if (!validiateWarehouse(req.body)) {
    return next({
      errorMessage: `Please provide inputs to all the required fields.`,
      statusCode: 400,
    });
  }
  //Create new warehouse object
  const newWarehouseItem = { id: uuidv4(), ...req.body };
  //Insert into the database
  const updatedWarehouseArray = await insertInto(
    warehouseJSON,
    newWarehouseItem
  );
  return res.status(201).json({
    data: updatedWarehouseArray,
    message: 'New warehouse has been added.',
  });
});

//Put - edit a warehouse
const editWarehouse = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  //If the req body failed the validation, pass the error
  if (!validiateWarehouse(req.body)) {
    return next({
      errorMessage: `Please provide inputs to all the required fields.`,
      statusCode: 400,
    });
  }
  const editedWarehouseItem = { ...req.body };
  const updatedWarehouses = await findByIdAndUpdate(
    warehouseJSON,
    id,
    editedWarehouseItem
  );
  //If can't find the warehouse object with the same id, pass the error to error handler
  if (!updatedWarehouses) {
    return next({
      errorMessage: `Can't find the warehouse associated with this id`,
      statusCode: 404,
    });
  }
  //Return the updated warehouse array
  return res
    .status(200)
    .json({ data: updatedWarehouses, message: 'Warehouse has been edited' });
});

//Delete - delete a warehouse
const deleteWarehouse = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  //Delete the warehouse
  const updatedWarehouseArray = await findByIdAndDelete(warehouseJSON, id);
  //If warehouse doesn't exist pass the error to error handler
  if (!updatedWarehouseArray) {
    return next({
      errorMessage: `Can't find the warehouse associated with this id.`,
      statusCode: 404,
    });
  }
  //Delete the inventory items that are linked to the warehouse
  await findByIdAndDelete(inventoryJSON, id, 'warehouseID');
  return res.status(200).json({
    data: updatedWarehouseArray,
    message: 'Warehouse has been deleted.',
  });
});

module.exports = {
  getWarehouses,
  getWarehouse,
  createWarehouse,
  editWarehouse,
  deleteWarehouse,
};
