import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import userService from '../../../src/services/user.service';
import userMocks from '../../mocks/user.mocks';
import userController from '../../../src/controllers/user.controller';

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Controller retorna status 200 e lista de usuarios', async function() {
    sinon.stub(userService, 'listAll').resolves(userMocks.allUsersMocks);

    await userController.listAll(req ,res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(userMocks.allUsersMocks);
  });
});
