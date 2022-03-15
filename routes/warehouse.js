const express = require('express');
const router = express.Router();
const warehouseController = require('../controller/warehouseController');

//Get - retrieve a warehouse
//Put - edit a warehouse
//Delete - delete a warehouse
router
  .get('/:id', warehouseController.getWarehouse)
  .put('/:id', warehouseController.editWarehouse)
  .delete('/:id', warehouseController.deleteWarehouse);

//Get - retrieve a list of warehouses
//Post - create a warehouse
router
  .get('/', warehouseController.getWarehouses)
  .post('/', warehouseController.createWarehouse);

module.exports = router;
