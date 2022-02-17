const { connection } = require('../../../infra/models/connection');

module.exports = class UsersRepository {
  constructor() {
    this.connection = connection;
  }

  async create(payload) {
    const db = await this.connection();
    const user = await db.collection('users').insertOne({ 
      ...payload,
      published: new Date(),
    });
    return { ...payload, _id: user.insertedId };
  }

  async find(payload) {
    const db = await this.connection();
    const user = await db.collection('users').findOne(payload);
    return user;
  }
};