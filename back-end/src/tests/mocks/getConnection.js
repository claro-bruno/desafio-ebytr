const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const MOCK_OPTIONS = { useUnifiedTopology: true };
const DB_SERVER = new MongoMemoryServer();

module.exports = async () => {
  const mockURL = await DB_SERVER.getUri();
  return MongoClient.connect(mockURL, MOCK_OPTIONS);
};