import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginController from '../../../src/controllers/login.controller';
import loginService from '../../../src/services/login.service';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Deve retornar status 201 e o token ao fazer login com sucesso', async function () {
    req.body = { username: 'user', password: 'password' };
    
    sinon.stub(loginService, 'login').resolves('token_mock');

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ token: 'token_mock' });
  });
});