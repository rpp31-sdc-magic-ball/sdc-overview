const createServer = require('./server/server');
const supertest = require('supertest');
const mongoose = require('mongoose');

beforeEach(done => {
  mongoose.connect(
    "mongodb://localhost/sdc",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach(done => {
  mongoose.connection.close(() => done());
});

const app = createServer();

test('Get a specific product', async() => {
  await supertest(app)
    .get('/products/1')
    .expect(200)
    .then((response) => {
      expect(typeof response === 'object').toBe(true)
      expect(response.body.id).toBe(1);
      expect(response.body.name).toEqual('Camo Onesie')
    })
});