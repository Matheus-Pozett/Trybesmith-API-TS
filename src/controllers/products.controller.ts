import { Request, Response } from 'express';
import productService from '../services/products.service';

const create = async (req: Request, res: Response): Promise<Response> => {
  const product = req.body;
  const newProduct = await productService.create(product);
  return res.status(201).json(newProduct);
};

const listAll = async (req: Request, res: Response): Promise<Response> => {
  const products = await productService.listAll();

  return res.status(200).json(products);
};

export default { create, listAll };