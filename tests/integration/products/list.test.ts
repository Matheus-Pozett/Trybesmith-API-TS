import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import productsMocks from '../../mocks/products.mocks';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Retorna status 200 e uma lista de produtos', async function() {
    const productsInstance = productsMocks.findAll.map((p) => ProductModel.build(p));

    sinon.stub(ProductModel, 'findAll').resolves(productsInstance);

    const response = await chai.request(app).get('/products');
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(productsMocks.findAll);
  });
});
