const { test, expect } = require('@jest/globals');
const sum = require('../exampleTest.js');

test('Example test: properly adds two numbers', () => {
  const result = sum(1, 2);
  expect(result).toBe(3);
});