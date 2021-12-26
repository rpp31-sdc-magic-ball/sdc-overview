const express = require('express');
const app = express();
const port = 3000;
const query = require('./database/index')

app.get('/', (req, res) => {
  res.send('SDC');
});

app.listen(port, () => {
  console.log(`listening at localhost:${port}`);
});

app.get('/products', (req, res) => {
  query.testFunc()
    .then(result => res.send(result).status(200))
    .catch(err => res.sendStatus(500))
});

app.get('/products/:product_id', (req, res) => {
  console.log(req.params.product_id)
  res.send('ok').status(200)
});

app.get('/products/:product_id/styles', (req, res) => {
  res.send('styles').status(200);
});