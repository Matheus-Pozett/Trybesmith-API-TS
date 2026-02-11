import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import bcrypt from 'bcryptjs';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  const loginBody = {
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

  it('Deve retornar status 201 e um token quando as credenciais são válidas', async function () {
    sinon.stub(UserModel, 'findOne').resolves(userModelMock);
    sinon.stub(bcrypt, 'compare').resolves(true as any);

    const response = await chai.request(app).post('/login').send(loginBody);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.have.property('token');
    expect(response.body.token).to.be.a('string');
  });

  it('Deve retornar status 401 quando o usuário não existe', async function () {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const response = await chai.request(app).post('/login').send(loginBody);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message', 'Username or password invalid');
  });

  it('Deve retornar status 401 quando a senha está incorreta', async function () {
    sinon.stub(UserModel, 'findOne').resolves(userModelMock);
    sinon.stub(bcrypt, 'compare').resolves(false as any);

    const response = await chai.request(app).post('/login').send(loginBody);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message', 'Username or password invalid');
  });

  it('Deve retornar status 400 quando o campo "username" não é informado', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send({ password: 'valid_password' });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message');
    
  });

  it('Deve retornar status 400 quando o campo "password" não é informado', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send({ username: 'valid_user' });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message');
  });
});