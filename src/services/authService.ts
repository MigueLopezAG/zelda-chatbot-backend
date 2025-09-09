import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
};

export const registerUser = async (username: string, email: string, password: string): Promise<IUser> => {
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new Error('User already exists with this email or username');
  }

  const user = new User({ username, email, password });
  await user.save();
  return user;
};

export const loginUser = async (email: string, password: string): Promise<{ user: IUser; token: string }> => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id.toString());
  return { user, token };
};