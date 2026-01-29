import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import jwtUtils, { TokenPayload } from '../utils/jwtUtils';
import UserError from '../Errors/user.error';
import { User } from '../types/User';

export type Login = {
  username: string;
  password: string;
};

const findUser = async (userData: string): Promise<User> => {
  const user = await UserModel.findOne({
    where: { username: userData },
  });

  if (!user) {
    throw new UserError('Username or password invalid', 401);
  }

  return user.dataValues;
};

const login = async (loginData: Login): Promise<string> => {
  const userExist = await findUser(loginData.username);
 
  if (!(await bcrypt.compare(loginData.password, userExist.password))) {
    throw new UserError('Username or password invalid', 401);
  }

  const payload: TokenPayload = {
    id: userExist.id,
    username: userExist.username,
  };

  const token = jwtUtils.generateToken(payload);

  return token;
};

export default { login };