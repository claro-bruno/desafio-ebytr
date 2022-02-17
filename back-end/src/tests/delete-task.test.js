const { ObjectId } = require('bson');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const sinon = require('sinon');
const server = require('../infra/http/server');
const createToken = require('./mocks/createToken');
const getConnection = require('./mocks/getConnection');

const { expect } = chai;

const payloadTaskId = ObjectId();
const TaskURI = `/tasks/${payloadTaskId.toString()}`;
const DB = 'todolist';

chai.use(chaiHttp);

describe('DELETE /tasks/:id', () => {
  let connectionMock;

  const payloadUserId = ObjectId();
  const payloadToken = createToken({
    id: payloadUserId.toString(),
    email: 'user@email.com',
    role: 'user',
  });

  const payloadTask = {
    _id: payloadTaskId,
    title: 'Other Task name',
    description: 'Others ingredients',
    userId: payloadUserId.toString(),
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Se o token não existir', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .delete(TaskURI);
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('deve retornar um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se o token for inválido', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .delete(TaskURI)
        .set('Authorization', 'my wrong token');
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('deve retornar um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se a receita não petencer ao usuário', () => {
    let response;

    const nonOwnerTOken = createToken({
      id: ObjectId.toString(),
      email: 'other@email.com',
      role: 'user',
    });

    before(async () => {
      await connectionMock.db(DB)
        .collection('tasks')
        .insertOne(payloadTask);

      response = await chai.request(server)
        .delete(TaskURI)
        .set('Authorization', nonOwnerTOken);
    });

    it('retorna o status 401', () => {
      expect(response).to.have.status(401);
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });


  });

  describe('Se o token for válido', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .delete(TaskURI)
        .set('Authorization', payloadToken);
    });

    it('retorna o status 204', () => {
      expect(response).to.have.status(204);
    });
  });
});