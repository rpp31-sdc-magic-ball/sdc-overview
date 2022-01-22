const express = require('express');
const redis = require('redis');
const app = express();

const PORT = process.env.PORT || 3001;
const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

let redisFunc = async() => {
  await client.connect();
  console.log('connected to REDIS')
}

redisFunc();

const products = require('./database/products');
const product = require('./database/product');
const styles = require('./database/styles');

app.get('/', (req, res) => {
  res.send('SDC');
});

app.listen(PORT, () => {
  console.log(`listening at localhost:${PORT}`);
});

let reqSaverKey;

const getCachedData = async(key) => {

  console.log('getting data from redis')
  const data = await client.get(key, (err, data) => {
    if (err) console.log(err);

    if (data !== null) {
      return JSON.parse(data);
    }
  })

  // console.log('my Data from REDIS: ', data)
  return data;
};

const setRedis = async(key, value) => {
  await client.set(key, JSON.stringify(value));
  return `${key} saved to REDIS`;
}

app.get('/products', (req, res) => {

  if (reqSaverKey !== undefined) {
    getCachedData(reqSaverKey)
      .then(cacheResult => {
        res.send(cacheResult).status(200)
      })
      .catch(cachedERR => res.sendStatus(500))
  } else {
    products.getProduct()
    .then(result => {
      reqSaverKey = 'products';
      // set data to REDIS
      setRedis(reqSaverKey, result)
        .then(setResult => console.log(setResult))
        .catch(setERR => console.log(setERR))

        res.send(result).status(200)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  }
});

let productTracker = [];

app.get('/products/:product_id', (req, res) => {

  if (productTracker.includes(req.params.product_id)) {
    getCachedData(`product${req.params.product_id}`)
      .then(cacheResult => {
        res.send(cacheResult).status(200)
      })
      .catch(cachedERR => res.sendStatus(500))
  } else {
    product.getOneProduct(req.params.product_id)
    .then(result => {
      // set data to REDIS
      setRedis(`product${req.params.product_id}`, result)
        .then(setResult => {
          productTracker.push(req.params.product_id)
          console.log(setResult)
        })
        .catch(setERR => console.log(setERR))

      res.send(result).status(200);
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  }
});

let styleTracker = [];

app.get('/products/:product_id/styles', (req, res) => {

  if (styleTracker.includes(req.params.product_id)) {
    getCachedData(`style${req.params.product_id}`)
      .then(cacheResult => {
        res.send(cacheResult).status(200)
      })
      .catch(cachedERR => res.sendStatus(500))
  } else {
    styles.getStyles(req.params.product_id)
    .then(result => {
    // set data to REDIS
    setRedis(`style${req.params.product_id}`, result)
      .then(setResult => {
        styleTracker.push(req.params.product_id)
        console.log(setResult)
      })
      .catch(setERR => console.log(setERR))

    res.send(result).status(200);
  })
  .catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
  }
});