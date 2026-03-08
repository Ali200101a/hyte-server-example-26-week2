// src/middlewares/error-handler.js
import { validationResult } from 'express-validator';

export const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Invalid request',
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }

  next();
};

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal server error',
    status,
  });
};

export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: 'Not found' });
};