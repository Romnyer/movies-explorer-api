require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const hemlet = require('helmet');

// Environment vars
const { PORT, DB_NAME } = process.env;

// Function imports
const router = require('./routes/index');
const errorCatcher = require('./middlewares/errorCatcher');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');

const app = express();

// Safety
app.use(hemlet());
app.use(cors());

// Connect to data base
mongoose.connect(DB_NAME, {});

// Parser
app.use(express.json());

// Request logging
app.use(requestLogger);

// Request limit (includes logger)
app.use(limiter);

// Routing
app.use('/', router);

// Error logging
app.use(errorLogger);

// Errors catch middlewares
app.use(errors());
app.use(errorCatcher);

// Set port
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
