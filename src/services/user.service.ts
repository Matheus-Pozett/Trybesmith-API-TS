import UserModel from '../database/models/user.model';
import ProductModel from '../database/models/product.model';

type UserWithProductList = {
  username: string;
  productIds?: { id: number }[];
};

type UserResponse = {
  username: string;
  productIds: number[];
};

const listAll = async (): Promise<UserResponse[]> => {
  const users = await UserModel.findAll({
    attributes: ['username'],
    include: { 
      model: ProductModel, 
      as: 'productIds', 
      attributes: ['id'],
    },
  });

  return users.map((user) => {
    const userPlain = user.toJSON() as UserWithProductList;

    return {
      username: userPlain.username,
      productIds: userPlain.productIds?.map((product) => product.id) || [],
    };
  });
};

export default { listAll };