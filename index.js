//Express import
const express = require('express');
const app = express();

//Enable env and create a port number
require('dotenv').config();
const PORT = process.env.PORT || 9000;

//Import Common express middlewares
const cors = require('cors');
const logger = require('morgan');

//Import Routes
const warehouseRouter = require('./routes/warehouse');
const inventoryRouter = require('./routes/inventory');

//Import Error Handler
const { CustomErrorHandler, CustomError } = require('./utils/CustomError');

//Enable morgan if in the dev mode
if (process.env.NODE_ENVIRONMENT === 'development') {
  app.use(logger('dev'));
}

// Allow cors and run body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/warehouses', warehouseRouter);
app.use('/inventories', inventoryRouter);

//Error handler who responsibes for returning errorMsg and statusCode
app.use((err, req, res, next) => {
  return CustomErrorHandler(err, res);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
