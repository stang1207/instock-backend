const express = require('express');
const app = express();

require('dotenv').config();
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const PORT = process.env.PORT || 9000;

if (process.env.NODE_ENVIRONMENT === 'development') {
  app.use(logger('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = app;
