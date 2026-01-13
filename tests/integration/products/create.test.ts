import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import productsMocks from '../../mocks/products.mocks';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Retorna status 201 CREATED e o objeto com novo produto', async function() {
    const productInstance = ProductModel.build(productsMocks.successCreated);
    sinon.stub(ProductModel, 'create').resolves(productInstance);
    const response = await chai.request(app).post('/products').send(productsMocks.successBody)
    console.log(productInstance)
    expect(response.status).to.be.eq(201);
    expect(response.body).to.be.deep.eq(productsMocks.successCreated)
  });
});
