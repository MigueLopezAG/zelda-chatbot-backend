import express from 'express';
import { body } from 'express-validator';
import { getHistory, sendMessage } from '../controllers/chatController';
import { authenticateToken } from '../middleware/auth';
import { handleValidationErrors } from '../middleware/validation';

const router = express.Router();

router.use(authenticateToken);

router.get('/history', getHistory);

router.post('/send', [
  body('message')
    .exists()
    .withMessage('Message is required')
    .notEmpty()
    .withMessage('Message cannot be empty'),
  handleValidationErrors
], sendMessage);

export default router;