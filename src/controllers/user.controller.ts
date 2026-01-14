import { Request, Response } from 'express';
import userService from '../services/user.service';

const listAll = async (req: Request, res: Response) => {
  const users = await userService.listAll();

  return res.status(200).json(users);
};

export default { listAll };