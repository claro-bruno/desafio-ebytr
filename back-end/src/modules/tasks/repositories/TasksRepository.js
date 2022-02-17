const { ObjectId } = require('mongodb');
const { connection } = require('../../../infra/models/connection');

module.exports = class TasksRepository {
  constructor() {
    this.connection = connection;
  }

  async create(payload) {
    const db = await this.connection();
    const user = await db.collection('tasks').insertOne({ 
      ...payload, 
      published: new Date(),
      updated: new Date(),
    });
    return { ...payload, _id: user.insertedId, published: new Date() };
  }

  async find(payload) {
    const db = await this.connection();
    const user = await db.collection('tasks').findOne(payload);
    return user;
  }

  async getAll(payload) {
    const db = await this.connection();
    return db.collection('tasks').find(payload).toArray();
  }

  async remove(id) {
    const db = await this.connection();
    return db.collection('tasks').deleteOne({ _id: ObjectId(id) });
  }

  async update(payload, taskId) {
    const db = await this.connection();
    await db.collection('tasks')
      .findOneAndUpdate(
        { _id: ObjectId(taskId) },
        { $set: { ...payload, updated: new Date() } },
        { returnDocument: 'after' },
      );
        
      return { ...payload, taskId };
  }

  async getById(id) {
    const db = await this.connection();
    return db.collection('tasks').findOne({ _id: ObjectId(id) });
  }
};