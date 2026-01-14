import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import userService from '../../../src/services/user.service';
import userMocks from '../../mocks/user.mocks';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Função listAll retorna lista de todos os usuarios', async function() {
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

    const result = await userService.listAll();

    expect(result).to.be.deep.eq(userMocks.allUsersMocks);
  });
});
