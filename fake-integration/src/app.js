const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const holdsRouter = require('./routes/holds');
const availabilityRouter = require('./routes/availability');

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(logger('combined'));

// MAKE SURE ANY MIDDLEWARE THAT SHOULD BE APPLIED TO EVERY ROUTE OTHER THAN UNHANDLED ERROR HANDLING
// IS REGISTERED BEFORE THIS LINE BELOW
app.use('/', indexRouter);
app.use('/holds', holdsRouter);
app.use('/availability', availabilityRouter);

// todo add better error handling middleware setup
app.use((err, req, res, next) => {
  console.log(err.message);
  console.log(err.stack);
  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json(err.message);
  // next(err);
  return next(err);
});

app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

module.exports = app;
