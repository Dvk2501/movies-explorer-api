require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const handlerErrors = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/bitfilmsdb ');

app.use(express.json());
app.use(cors);

app.use(helmet());
app.use(requestLogger);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handlerErrors);

app.listen(PORT);
