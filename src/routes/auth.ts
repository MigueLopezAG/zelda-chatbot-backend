import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController';
import { handleValidationErrors } from '../middleware/validation';

const router = express.Router();

router.post('/register', [
  body('username')
    .exists()
    .withMessage('Username is required')
    .notEmpty()
    .withMessage('Username cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric'),
  body('email')
    .exists()
    .withMessage('Email is required')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .exists()
    .withMessage('Password is required')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
], register);

router.post('/login', [
  body('email')
    .exists()
    .withMessage('Email is required')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .exists()
    .withMessage('Password is required')
    .notEmpty()
    .withMessage('Password cannot be empty'),
  handleValidationErrors
], login);

export default router;