const express = require('express');
const app = express();
const port = 3001;
const products = require('./database/products');
const product = require('./database/product');
const styles = require('./database/styles');

app.get('/', (req, res) => {
  res.send('SDC');
});

app.listen(port, () => {
  console.log(`listening at localhost:${port}`);
});

app.get('/products', (req, res) => {
  products.getProduct()
    .then(result => res.send(result).status(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

app.get('/products/:product_id', (req, res) => {
  product.getOneProduct(req.params.product_id)
    .then(result => res.send(result).status(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

app.get('/products/:product_id/styles', (req, res) => {
  styles.getStyles(req.params.product_id)
    .then(result => res.send(result).status(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});