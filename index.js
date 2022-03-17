const express = require('express');
const app = express();

require('dotenv').config();
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const PORT = process.env.PORT || 9000;

const warehouseRouter = require('./routes/warehouse');
const inventoryRouter = require('./routes/inventory');

if (process.env.NODE_ENVIRONMENT === 'development') {
  app.use(logger('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/warehouses', warehouseRouter);
app.use('/inventories', inventoryRouter);

//Error handling
app.use((err, req, res, next) => {
  const { errorMessage, statusCode } = err;
  if (errorMessage && statusCode) {
    return res.status(statusCode).json({ errorMessage, statusCode });
  }
  return res.status(500).json({ errorMessage: 'There is an error occurred!' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
