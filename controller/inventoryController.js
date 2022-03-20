const inventoryJSON = require('path').join(__dirname, '../data/inventory.json');
const warehouseJSON = require('path').join(__dirname, '../data/warehouse.json');
const { CustomError } = require('../utils/CustomError');
const {
  sortBy,
  readData,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  insertInto,
} = require('../utils/modifyDatabase');

//Get - retrieve a list of inventories
const getInventories = async (req, res) => {
  const { warehouseID, sort, order } = req.query;
  const inventories = await readData(inventoryJSON);
  //If warehouse id is included, send only inventory items related to that warehouse
  if (warehouseID) {
    const filteredInventories = inventories.filter(
      (item) => item.warehouseID === warehouseID
    );
    //If sort is true, return the filtered and sorted inventory items, else return filtered array
    return res.status(200).json({
      data: sort
        ? filteredInventories.sort(sortBy(sort, order))
        : filteredInventories,
    });
  }
  //If sort term is included in the query, return sorted inventories items, else return all the inventories items as default
  return res
    .status(200)
    .json({ data: sort ? inventories.sort(sortBy(sort, order)) : inventories });
};

//Get - retrieve an inventory item
const getInventory = async (req, res) => {
  const { id } = req.params;
  const foundInventory = await findById(inventoryJSON, id);
  if (!foundInventory) {
    throw new CustomError(404, `Can't find the inventory item with this id.`);
  }
  return res.status(200).json({ data: foundInventory });
};

//Post - create a new invenotry item
const createInventory = async (req, res) => {
  // Check if the warehouse exists and throw error if it doesn't
  const { warehouseID } = req.body;
  const foundWarehouse = await findById(warehouseJSON, warehouseID);
  if (!foundWarehouse) {
    throw new CustomError(404, `Can't find the warehouse with this id.`);
  }
  // inventory data that is already validated by the middleware
  const validatedInventoryItem = req.validatedData;
  // Insert the validated inventory item into the database
  const updatedInventoryArray = await insertInto(
    inventoryJSON,
    validatedInventoryItem
  );
  return res.status(201).json({
    data: updatedInventoryArray,
    message: 'New inventory item has been added!',
  });
};

//Put - edit an inventory item
const editInventory = async (req, res) => {
  const { id } = req.params;
  // inventory data that is already validated by the middleware
  const validatedInventoryItem = req.validatedData;
  // insert the edited data into the database
  const updatedInventoryArray = await findByIdAndUpdate(
    inventoryJSON,
    id,
    validatedInventoryItem
  );
  //If if the inventory item with this id is not found, throw error
  if (!updatedInventoryArray) {
    throw new CustomError(404, `Can't find the inventory item with this id.`);
  }
  return res.status(200).json({
    data: updatedInventoryArray,
    message: 'The inventory item has been edited',
  });
};

//Delete - delete an invenotry item
const deleteInventory = async (req, res) => {
  const { id } = req.params;
  //Check if the inventory item exists, either throw error or delete the item
  const updatedInventoryArray = await findByIdAndDelete(inventoryJSON, id);
  if (!updatedInventoryArray) {
    throw new CustomError(404, `Can't find the inventory item with this id.`);
  }
  return res.status(200).json({
    data: updatedInventoryArray,
    message: 'The inventory item has been deleted',
  });
};

module.exports = {
  getInventories,
  getInventory,
  createInventory,
  editInventory,
  deleteInventory,
};
