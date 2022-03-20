const express = require('express');
const router = express.Router();
const {
  getWarehouses,
  getWarehouse,
  createWarehouse,
  editWarehouse,
  deleteWarehouse,
} = require('../controller/warehouseController');
const { validateWarehouse } = require('../middleware');
const { asyncErrorCatcher } = require('../utils/asyncErrorCatcher');

/*  
  Endpoint: /warehouses/:id
    GET - retrieve a warehouse
    PUT - first go through validation middleware, then edit a warehouse
    DELETE - delete a warehouse
*/
router
  .route('/:id')
  .get(asyncErrorCatcher(getWarehouse))
  .put(validateWarehouse, asyncErrorCatcher(editWarehouse))
  .delete(asyncErrorCatcher(deleteWarehouse));

/*  
  Endpoint: /warehouses/
    GET - retrieve a list of warehouses
    POST - first go through validation middleware, then create a warehouse
*/
router
  .route('/')
  .get(asyncErrorCatcher(getWarehouses))
  .post(validateWarehouse, asyncErrorCatcher(createWarehouse));

module.exports = router;
