const { v4: uuidv4 } = require('uuid');
const { asyncWrapper } = require('../utils/asyncErrorCatcher');
const { validateInventoryItem } = require('../model/inventory.js');
const inventoryJSON = require('path').join(__dirname, '../data/inventory.json');
const warehouseJSON = require('path').join(__dirname, '../data/warehouse.json');
const {
  readData,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  insertInto,
} = require('../utils/modifyDatabase');

//Get - retrieve a list of inventories
const getInventories = asyncWrapper(async (req, res, next) => {
  const { warehouseID } = req.query;
  const inventories = await readData(inventoryJSON);
  //If warehouseID query exists, return the filtered warehouse array
  if (warehouseID) {
    const filteredInventories = inventories.filter(
      (item) => item.warehouseID === warehouseID
    );
    return res.status(200).json({ data: filteredInventories });
  }
  //Return warehouse array
  return res.status(200).json({ data: inventories });
});

//Get - retrieve an inventory item
const getInventory = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const foundInventory = await findById(inventoryJSON, id);
  if (!foundInventory) {
    return next({
      errorMessage: `Can't find the inventory item associated with this id!`,
      statusCode: 404,
    });
  }
  return res.status(200).json({ data: foundInventory });
});

//Post - create a new invenotry item
const createInventory = asyncWrapper(async (req, res, next) => {
  const errors = validateInventoryItem(req.body);
  if (errors) {
    return next({
      errorMessage: `Please provide valid inputs: ${errors.join(', ')}`,
      statusCode: 404,
    });
  }
  const { warehouseID } = req.body;
  const foundWarehouse = await findById(warehouseJSON, warehouseID);
  if (!foundWarehouse) {
    return next({
      errorMessage: `Can't find the warehouse associated with this id.`,
      statusCode: 404,
    });
  }
  const newInventoryItem = {
    id: uuidv4(),
    ...req.body,
    status: Number(req.body.quantity) > 0 ? 'In Stock' : 'Out of Stock',
    quantity: Number(req.body.quantity),
  };
  const updatedInventoryArray = await insertInto(
    inventoryJSON,
    newInventoryItem
  );
  return res.status(201).json({
    data: updatedInventoryArray,
    message: 'New inventory item has been added!',
  });
});

//Put - edit an inventory item
const editInventory = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const errors = validateInventoryItem(req.body);
  if (errors) {
    return next({
      errorMessage: `Please provide valid inputs: ${errors.join(', ')}`,
      statusCode: 404,
    });
  }
  const updatedInventoryArray = await findByIdAndUpdate(inventoryJSON, id, {
    id,
    ...req.body,
    status: Number(req.body.quantity) > 0 ? 'In Stock' : 'Out of Stock',
  });
  if (!updatedInventoryArray) {
    return next({
      errorMessage: `Can't find the inventory item associated with this id..`,
      statusCode: 404,
    });
  }
  return res.status(200).json({
    data: updatedInventoryArray,
    message: 'The inventory item has been edited',
  });
});

//Delete - delete an invenotry item
const deleteInventory = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const updatedInventoryArray = await findByIdAndDelete(inventoryJSON, id);
  if (!updatedInventoryArray) {
    return next({
      errorMessage: `Can't find the inventory item associated with this id.`,
      statusCode: 404,
    });
  }
  return res.status(200).json({
    data: updatedInventoryArray,
    message: 'The inventory item has been deleted',
  });
});

module.exports = {
  getInventories,
  getInventory,
  createInventory,
  editInventory,
  deleteInventory,
};
