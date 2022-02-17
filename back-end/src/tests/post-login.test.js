const { ObjectId } = require('bson');
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const sinon = require('sinon');
const server = require('../infra/http/server');
const getConnection = require('./mocks/getConnection');
const jwtSecret = require('./mocks/jwtSecret');

const { expect } = chai;

const loginURI = '/users/login';
const DB = 'todolist';

chai.use(chaiHttp);

describe('POST /login', () => {
  let connectionMock;

  const payloadEmail = 'email@betrybe.com';
  const payloadPass = 'password123';
  const payloadBody = {
    email: payloadEmail,
    password: payloadPass,
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Se o email não for passado no body', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post(loginURI)
        .send({ password: payloadPass });
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se a senha não for passada no body', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post(loginURI)
        .send({ email: payloadEmail });
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se o email não for válido', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post(loginURI)
        .send({ email: 'email@.com', password: payloadPass });
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se a senha for uma string vazia', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post(loginURI)
        .send({ email: payloadEmail, password: '' });
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se a senha não for uma string', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post(loginURI)
        .send({ email: payloadEmail, password: 1232131 });
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se o email não estiver cadastrado', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post(loginURI)
        .send(payloadBody);
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se a senha for incorreta', () => {
    let response;

    const payloadUser = {
      name: 'Name Lastname',
      email: payloadEmail,
      password: payloadPass,
      role: 'user',
    };

    before(async () => {
      await connectionMock.db('Cookmaster')
        .collection('users')
        .insertOne(payloadUser);

      response = await chai.request(server)
        .post(loginURI)
        .send({ email: payloadEmail, password: 'incorrectPassword' });
    });

    after(async () => {
      await connectionMock.db('Cookmaster')
        .collection('users')
        .drop();
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });
  });

  describe('Se email e senha forem válidos', () => {
    let response;
    const payloadId = ObjectId();
    const payloadRole = 'user';

    const payloadUser = {
      _id: payloadId,
      name: 'Name Lastname',
      email: payloadEmail,
      password: payloadPass,
      role: payloadRole,
    };

    before(async () => {
      await connectionMock.db(DB)
        .collection('users')
        .insertOne(payloadUser);

      response = await chai.request(server)
        .post(loginURI)
        .send(payloadBody);
    });

    after(async () => {
      await connectionMock.db(DB)
        .collection('users')
        .drop();
    });

    it('retorna o status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "token"', () => {
      expect(response.body).to.have.property('token');
    });

    it('retorna o token esperada', () => {
      const { data } = jwt.decode(response.body.token, jwtSecret)

      expect(data).to.deep.equal({
        id: payloadId.toString(),
        email: payloadEmail,
        role: payloadRole,
      });
    });
  });
});