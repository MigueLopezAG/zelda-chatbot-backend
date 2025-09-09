import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { findAnswer, saveMessage, getChatHistory } from '../services/chatService';

export const getHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const history = await getChatHistory(req.user!._id.toString());
    res.json(history);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { message } = req.body;
    
    // Save user message
    await saveMessage(req.user!._id.toString(), message, true);
    
    // Get bot answer
    const answer = findAnswer(message);
    
    // Save bot answer
    await saveMessage(req.user!._id.toString(), answer, false);
    
    res.json({ answer });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};