import { Request, Response } from 'express';
import User, { IUser } from '../model/userModel';

// ایجاد کاربر جدید
export const createUser = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body)  
  try {
        const user: IUser = await User.create(req.body);
        
        res.status(201).json(user);
    } catch (err: any) {
        
        res.status(400).json({
          error:err.message,
          
        });
    }
};

// دریافت همه کاربران
export const getUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await User.find();
        res.status(200).json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

// دریافت کاربر با آیدی
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser | null = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

// بروزرسانی کاربر
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser | null = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

// حذف کاربر
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser | null = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
