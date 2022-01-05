const createServer = require('./server/server');
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = createServer();

afterEach(done => {
  mongoose.connection.close(() => done());
});

test('Get a specific products styles', async() => {
  await supertest(app)
    .get('/products/1/styles')
    .expect(200)
    .then((response) => {
      expect(typeof response === 'object').toBe(true)
      expect(Array.isArray(response.body.results)).toBeTruthy();
    })
});