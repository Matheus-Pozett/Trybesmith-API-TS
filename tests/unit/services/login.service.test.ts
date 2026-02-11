import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import loginService from '../../../src/services/login.service';
import UserModel from '../../../src/database/models/user.model';
import jwtUtils from '../../../src/utils/jwtUtils';

const loginMock = {
  username: 'valid_user',
  password: 'valid_password',
};

const userMock = {
  id: 1,
  username: 'valid_user',
  password: 'hashed_password',
};

const userModelMock = {
  dataValues: userMock,
} as any;

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Deve disparar um erro se o username não for encontrado', async function () {
    sinon.stub(UserModel, 'findOne').resolves(null);

    try {
      await loginService.login(loginMock);
    } catch (error: any) {
      expect(error.message).to.be.equal('Username or password invalid');
      expect(error.status).to.be.equal(401);
    }
  });

  it('Deve disparar um erro se a senha estiver incorreta', async function () {
    sinon.stub(UserModel, 'findOne').resolves(userModelMock);

    sinon.stub(bcrypt, 'compare').resolves(false as any);

    try {
      await loginService.login(loginMock);
    } catch (error: any) {
      expect(error.message).to.be.equal('Username or password invalid');
      expect(error.status).to.be.equal(401);
    }
  });

  it('Deve retornar um token quando o login for bem sucedido', async function () {
    sinon.stub(UserModel, 'findOne').resolves(userModelMock);
    sinon.stub(bcrypt, 'compare').resolves(true as any);
    sinon.stub(jwtUtils, 'generateToken').returns('valid_token');

    const token = await loginService.login(loginMock);

    expect(token).to.be.equal('valid_token');
  });
});