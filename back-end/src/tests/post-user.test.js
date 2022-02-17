const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const sinon = require('sinon');
const server = require('../infra/http/server');
const getConnection = require('./mocks/getConnection');

const { expect } = chai;

chai.use(chaiHttp);

const userURI = '/users';
const DB = 'todolist';

describe('POST /users', () => {
  let connectionMock;

  const payloadName = 'Name Lastname';
  const payloadEmail = 'email@betrybe.com';
  const payloadPass = 'password123';
  const payloadBody = {
    name: payloadName,
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

  describe('Se o nome não for passado no body', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post(userURI)
        .send({
          email: payloadEmail,
          password: payloadPass,
        });
    });

    it('retorna o status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se o email não for passado no body', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post(userURI)
        .send({
          name: payloadName,
          password: payloadPass,
        });
    });

    it('retorna o status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se a senha não for passada no body', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post(userURI)
        .send({
          name: payloadName,
          email: payloadEmail,
        });
    });

    it('retorna o status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se o email não for válido', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post(userURI)
        .send({
          name: payloadName,
          email: 'email@.com',
          password: payloadPass,
        });
    });

    it('retorna o status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se email não for único', () => {
    let response = {};

    before(async () => {
      await connectionMock.db(DB)
        .collection('users')
        .insertOne({ ...payloadBody, role: 'user' });

      response = await chai.request(server)
        .post(userURI)
        .send(payloadBody);
    });

    after(async () => {
      await connectionMock.db(DB)
        .collection('users')
        .drop();
    });

    it('retorna o status 409', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se a senha for uma string vazia', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post(userURI)
        .send({
          name: payloadName,
          email: payloadEmail,
          password: '',
        });
    });

    it('retorna o status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });


  });

  describe('Se o nome não for uma string', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post(userURI)
        .send({
          name: 8,
          email: payloadEmail,
          password: payloadPass,
        });
    });

    it('retorna o status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('retorna a mensagem esperada', () => {
      expect(response.body.message).to.be.equal('"name" must be a string');
    });
  });

  describe('Se for um usuário válido', () => {
    let response = {};

    before(async () => {
      response = await chai.request(server)
        .post(userURI)
        .send(payloadBody);
    });

    after(async () => {
      await connectionMock.db(DB)
        .collection('users')
        .drop();
    });

    it('retorna o status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('a chave "user" possui o usuário experado', async () => {
      const { _id } = await connectionMock.db(DB)
        .collection('users')
        .findOne({ email: payloadEmail });
      
      const payloadRole = 'user';

      const expectedUser = {
        name: payloadBody.name,
        email: payloadBody.email,
        role: payloadRole,
        _id: _id.toString(),
      };

    
      expect(response.body.user).to.deep.equal(expectedUser);
    });
  });
});