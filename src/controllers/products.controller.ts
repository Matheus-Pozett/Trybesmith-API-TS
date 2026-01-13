import { Request, Response } from 'express';
import productService from '../services/products.service';

const create = async (req: Request, res: Response): Promise<Response> => {
  const product = req.body;
  const newProduct = await productService.create(product);
  return res.status(201).json(newProduct);
};

export default { create };