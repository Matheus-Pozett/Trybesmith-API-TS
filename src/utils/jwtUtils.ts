import Jwt from 'jsonwebtoken';

export type TokenPayload = {
  id: number;
  username: string;
};

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const jwtConfig: Jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (data: TokenPayload): string => {
  const token = Jwt.sign(data, secret, jwtConfig);

  return token;
};

const verifyToken = (token: string): TokenPayload => {
  const payload = Jwt.verify(token, secret) as TokenPayload;
  return payload;
};

export default { generateToken, verifyToken };