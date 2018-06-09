require('dotenv').config();
const MongodbMemoryServer = require('mongodb-memory-server').default;

const MONGO_DB_NAME = 'jest';
const mongod = new MongodbMemoryServer({
  instance: {
    dbName: MONGO_DB_NAME,
  },
  binary: {
    version: '3.2.19',
  },
});

module.exports = function() {
  global.__MONGOD__ = mongod;
  global.__MONGO_DB_NAME__ = MONGO_DB_NAME;
};
