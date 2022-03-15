const express = require('express');
const router = express.Router();
const invenotryController = require('../controller/inventoryController');

//Get - retrieve an inventory item
//Put - edit an inventory item
//Delete - delete an inventory item
router
  .get('/:id', invenotryController.getInventory)
  .put('/:id', invenotryController.editInventory)
  .delete('/:id', invenotryController.deleteInventory);

//Get - retrieve a list of inventory items
//Post - create a new inventory item
router
  .get('/', invenotryController.getInventories)
  .post('/', invenotryController.createInventory);

module.exports = router;
