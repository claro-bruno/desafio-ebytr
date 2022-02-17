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
const TaskURI = `/Tasks/${payloadTaskId.toString()}`;
const DB = 'todolist';

chai.use(chaiHttp);

describe('GET /Tasks/:id', () => {
  let connectionMock;

  const payloadEmail = 'email@betrybe.com';
  const payloadUserId = ObjectId();
  const payloadToken = createToken({
    id: payloadUserId.toString(),
    email: payloadEmail,
    role: 'user',
  });

  const expectedTask = {
    _id: payloadTaskId.toString(),
    title: 'titulo1',
    description: 'Fazer Boloco',
    userId: '61a4a91b968fbc5f270910ff',
  };

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Se a task não for encontrada', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .get(TaskURI);
    });

    it('retorna o status 404', () => {
      expect(response).to.have.status(404);
    });

    it('deve retornar um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto possui a chave "message"', () => {
      expect(response.body).to.have.property('message');
    });

  });

  describe('Se a task for encontrada', () => {
    let response;

    before(async () => {
      await connectionMock.db(DB)
        .collection('Tasks')
        .insertOne({
          _id: payloadTaskId,
          title: 'Receita de frango do Jacquin',
          description: 'Fazer essa receita',
          userId: '61a4a91b968fbc5f270910ff',
        });

      response = await chai.request(server)
        .get(TaskURI);
    });

    it('retorna o status 200', () => {
      expect(response).to.have.status(200);
    });

    it('deve retornar um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto deve conter a receita esperada', () => {
      expect(response.body).to.deep.equal(expectedTask);
    });
  });

  describe('Se tiver autenticado', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .get(TaskURI)
        .set('Authorization', payloadToken);
    });

    after(async () => {
      await connectionMock.db(DB)
        .collection('tasks')
        .drop();
    });

    it('retorna o status 200', () => {
      expect(response).to.have.status(200);
    });

    it('deve retornar um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('tal objeto deve conter a receita esperada', () => {
      expect(response.body).to.deep.equal(expectedTask);
    });
  });
});