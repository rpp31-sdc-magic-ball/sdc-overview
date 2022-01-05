const express = require("express");
const router = express.Router();

const products = require('../../database/products');
const product = require('../../database/product');
const styles = require('../../database/styles');

router.get('/', (req, res) => {
  res.send('SDC');
});

router.get('/products', (req, res) => {
  products.getProduct()
    .then(result => res.send(result).status(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.get('/products/:product_id', (req, res) => {
  product.getOneProduct(req.params.product_id)
    .then(result => res.send(result).status(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.get('/products/:product_id/styles', (req, res) => {
  styles.getStyles(req.params.product_id)
    .then(result => res.send(result).status(200))
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

module.exports = router;