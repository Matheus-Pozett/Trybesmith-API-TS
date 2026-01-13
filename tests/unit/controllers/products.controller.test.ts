import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsMocks from '../../mocks/products.mocks';
import productsService from '../../../src/services/products.service';
import productsController from '../../../src/controllers/products.controller';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Retorna httpStatus 201 e json com o novo produto criado', async function () {
    req.body = productsMocks.successBody;

    sinon.stub(productsService, 'create').resolves(productsMocks.successCreated);

    await productsController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productsMocks.successCreated);
    expect(productsService.create).to.have.been.calledOnce;
  });
});
