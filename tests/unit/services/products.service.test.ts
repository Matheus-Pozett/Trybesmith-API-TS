import { expect } from 'chai';
import sinon from 'sinon';
import productsMocks from '../../mocks/products.mocks';
import ProductModel from '../../../src/database/models/product.model';
import productsService from '../../../src/services/products.service';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Cria produto no banco de dados com sucesso', async function() {
    const productInstance = ProductModel.build(productsMocks.successCreated);
    sinon.stub(ProductModel, 'create').resolves(productInstance);

    const result = await productsService.create(productsMocks.successBody);

    expect(result).to.have.deep.eq(productInstance.dataValues);
  });
});
