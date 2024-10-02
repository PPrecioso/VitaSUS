const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const logger = (app) => {
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }
};

const security = (app) => {
  app.use(helmet()); // Adiciona headers de segurança
};

const enableCors = (app) => {
  const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
};

module.exports = {
  logger,
  security,
  enableCors,
  errorHandler,
};
