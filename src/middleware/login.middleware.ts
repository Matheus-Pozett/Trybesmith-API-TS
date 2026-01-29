import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import LoginError from '../Errors/login.error';

const MESSAGE = '"username" and "password" are required';

const loginJoiSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': MESSAGE,
    'string.empty': MESSAGE,
  }),
  password: Joi.string().required().messages({
    'any.required': MESSAGE,
    'string.empty': MESSAGE,
  }),
});

const login = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = loginJoiSchema.validate(req.body);

  if (error) {
    const { message } = error.details[0];
    throw new LoginError(message);
  }

  next();
};

export default { login };