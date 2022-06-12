const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const apiRoutes = require('./routes/v1/api.routes');
const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', apiRoutes);

app.use((error, req, res, next) => {
  console.log('Error:', error);
  const errorStatus = error.status || 500;
  const errorMessage = error.message || 'Something went wrong!';
  return res.status(errorStatus).json({ errorMessage, errorStatus });
  //   console.log('Middleware 1');
  //   next();
});

module.exports = app;
