import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {

    if (!req.body) {
      res.status(400).json({ error: "The username, email or password are required" });
      return;
    }

    const { username, email, password } = req.body;
    const user = await registerUser(username, email, password);
    
    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body) {
      res.status(400).json({ error: "The email or password are required" });
      return;
    }

    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    
    res.json({ 
      message: 'Login successful',
      user: { id: user._id, username: user.username, email: user.email },
      token 
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};