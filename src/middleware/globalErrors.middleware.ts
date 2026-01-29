import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  status?: number;
}

const globalError = (
  err: CustomError, 
  req: Request, 
  res: Response, 
  _next: NextFunction,
): Response => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: 'Erro interno do servidor' });
};

export default globalError;