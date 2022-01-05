const createServer = require('./server/server');
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = createServer();

afterEach(done => {
  mongoose.connection.close(() => done());
});

test('Get products', async() => {
  await supertest(app)
    .get('/products')
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(5);
    })
});

