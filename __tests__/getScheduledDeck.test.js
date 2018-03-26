const { MongoClient } = require('mongodb');
const { getScheduledDeck } = require('Utils/db');

let connection;
let db;

beforeAll(async () => {
  connection = await MongoClient.connect(global.__MONGO_URI__);
  db = await connection.db(global.__MONGO_DB_NAME__);
});

afterAll(async () => {
  await connection.close();
  await db.close();
});

beforeEach(() => {
  const schedule = db.collection('schedule');
})

it('should get the scheduled deck for the current time', async () => {
  await schedule.insert({
    time: 2,
    deck: 'Metroid'
  });

  const scheduledDeck = await getScheduledDeck();
  expect(scheduledDeck).Equal('Metroid');
});
