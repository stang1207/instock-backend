const express = require('express');
const router = express.Router();
const invenotryController = require('../controller/inventoryController');

//Get - retrieve an inventory item
//Put - edit an inventory item
//Delete - delete an inventory item
router
  .route('/:id')
  .get(invenotryController.getInventory)
  .put(invenotryController.editInventory)
  .delete(invenotryController.deleteInventory);

//Get - retrieve a list of inventory items
//Post - create a new inventory item
router
  .route('/')
  .get(invenotryController.getInventories)
  .post(invenotryController.createInventory);

module.exports = router;
