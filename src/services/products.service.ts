import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';

const create = async (product: ProductInputtableTypes): Promise<Product> => {
  const newProduct = await ProductModel.create(product);

  return newProduct.dataValues;
};

const listAll = async (): Promise<Product[]> => {
  const products = await ProductModel.findAll();
  return products.map((product) => product.dataValues);
};

export default { create, listAll };