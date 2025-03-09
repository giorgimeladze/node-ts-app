import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

// Helper function to format response
const formatUser = (user: IUser) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt,
});

// ✅ Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json(users.map(formatUser));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Get a user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(formatUser(user));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const newUser: IUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json(formatUser(newUser));
  } catch (error) {
    res.status(400).json({ message: 'Validation Error', error });
  }
};

// ✅ Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: IUser | null = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
