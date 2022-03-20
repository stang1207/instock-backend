const express = require('express');
const router = express.Router();
const {
  getInventories,
  getInventory,
  editInventory,
  deleteInventory,
  createInventory,
} = require('../controller/inventoryController');
const { asyncErrorCatcher } = require('../utils/asyncErrorCatcher');
const { validateInventoryItem } = require('../middleware');

/*  
  Endpoint: /videos/:id
    GET - retrieve an inventory item
    PUT - first go through validation middleware, then edit an inventory item
    DELETE - delete an inventory item 
*/
router
  .route('/:id')
  .get(asyncErrorCatcher(getInventory))
  .put(validateInventoryItem, asyncErrorCatcher(editInventory))
  .delete(asyncErrorCatcher(deleteInventory));

/*  
  Endpoint: /videos/
    GET - retrieve a list of inventory items
    POST - first go through validation middleware, then create an inventory item
*/
router
  .route('/')
  .get(asyncErrorCatcher(getInventories))
  .post(validateInventoryItem, asyncErrorCatcher(createInventory));

module.exports = router;
