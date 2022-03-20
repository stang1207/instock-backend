const inventoryJSON = require('path').join(__dirname, '../data/inventory.json');
const warehouseJSON = require('path').join(__dirname, '../data/warehouse.json');
const { CustomError } = require('../utils/CustomError');
const {
  readData,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  insertInto,
  sortBy,
} = require('../utils/modifyDatabase');

//Get - retrieve a list of warehouses
const getWarehouses = async (req, res) => {
  const warehouseArray = await readData(warehouseJSON);
  //If sort term is included in the query, return the sorted array, else return all the warehouses
  let { sort, order } = req.query;
  return res.status(200).json({
    data: sort ? warehouseArray.sort(sortBy(sort, order)) : warehouseArray,
  });
};

//Get - retrieve a warehouse
const getWarehouse = async (req, res) => {
  //If can't find a warehouse with the same id, throw error
  const { id } = req.params;
  const foundWarehouse = await findById(warehouseJSON, id);
  if (!foundWarehouse) {
    throw new CustomError(404, `Can't find the warehouse with this id.`);
  }
  return res.status(200).json({ data: foundWarehouse });
};

//Post - add a new warehouse
const createWarehouse = async (req, res, next) => {
  //Insert the validated warehouse object into the database
  const validatedWarehouseData = req.validatedData;
  const updatedWarehouseArray = await insertInto(
    warehouseJSON,
    validatedWarehouseData
  );
  return res.status(201).json({
    data: updatedWarehouseArray,
    message: 'New warehouse has been added.',
  });
};

//Put - edit a warehouse
const editWarehouse = async (req, res) => {
  const { id } = req.params;
  const validatedWarehouseData = req.validatedData;
  //Check if the warehouse with that id exists, if it doesn't, throw an error
  //Else insert the validated warehouse object into the database or
  const updatedWarehouses = await findByIdAndUpdate(
    warehouseJSON,
    id,
    validatedWarehouseData
  );
  //If can't find the warehouse object with the same id, throw error
  if (!updatedWarehouses) {
    throw new CustomError(404, `Can't find the warehouse with this id.`);
  }
  //Return the updated warehouse array
  return res
    .status(200)
    .json({ data: updatedWarehouses, message: 'Warehouse has been edited' });
};

//Delete - delete a warehouse
const deleteWarehouse = async (req, res) => {
  //If the warehouse with this id doesn't exist, throw error
  const { id } = req.params;
  const updatedWarehouseArray = await findByIdAndDelete(warehouseJSON, id);
  if (!updatedWarehouseArray) {
    throw new CustomError(404, `Can't find the warehouse with this id.`);
  }
  //Delete the inventory items that are linked to the warehouse
  await findByIdAndDelete(inventoryJSON, id, 'warehouseID');
  return res.status(200).json({
    data: updatedWarehouseArray,
    message: 'The Warehouse and its inventory items have been deleted.',
  });
};

module.exports = {
  getWarehouses,
  getWarehouse,
  createWarehouse,
  editWarehouse,
  deleteWarehouse,
};
