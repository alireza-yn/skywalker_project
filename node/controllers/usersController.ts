// src/controllers/usersController.ts

import { Request, Response } from 'express';
import usersService from '../services/usersService';

// دریافت تمام کاربران
const getUsers = (req: Request, res: Response): void => {
  try {
    const users = usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت کاربران' });
  }
};

// دریافت یک کاربر بر اساس شناسه
const getUserById = (req: Request, res: Response): void => {
  const userId = parseInt(req.params.id);

  try {
    const user = usersService.getUserById(userId);

    if (!user) {
      
       res.status(404).json({ message: 'کاربر پیدا نشد' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت کاربر' });
  }
};

export default { getUsers, getUserById };
