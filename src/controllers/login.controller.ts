import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response) => {
  const data = req.body;
  const token = await loginService.login(data);
  return res.status(201).json({ token });
};

export default { login };