const express = require('express');
const router = express.Router();
const warehouseController = require('../controller/warehouseController');

//Get - retrieve a warehouse
//Put - edit a warehouse
//Delete - delete a warehouse
router
  .route('/:id')
  .get(warehouseController.getWarehouse)
  .put(warehouseController.editWarehouse)
  .delete(warehouseController.deleteWarehouse);

//Get - retrieve a list of warehouses
//Post - create a warehouse
router
  .route('/')
  .get(warehouseController.getWarehouses)
  .post(warehouseController.createWarehouse);

module.exports = router;
