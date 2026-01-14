import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../../../src/database/models/user.model';
import app from '../../../src/app';
import userMocks from '../../mocks/user.mocks';

chai.use(chaiHttp);

describe('GET /users', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Retorna status 200 e uma lista com username e productsId', async function() {
    const dbData = [
      {
        username: 'Hagar',
        productIds: [ { id: 1 }, { id: 2 } ]
      },
      {
        username: 'Eddie',
        productIds: [ { id: 3 }, { id: 4 } ]
      }
    ];

    const usersInstances = dbData.map((u) => {
      const user = UserModel.build(u as any);
      (user as any).dataValues.productIds = u.productIds;
      return user;
    });

    sinon.stub(UserModel, 'findAll').resolves(usersInstances);

    const response = await chai.request(app).get('/users');

    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.deep.eq(userMocks.allUsersMocks);
  });
});