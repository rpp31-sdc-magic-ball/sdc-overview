const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sdc', { useNewUrlParser: true, useUnifiedTopology: true});

const productsSchema = new mongoose.Schema({
    _id: Number,
    id: Number,
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: String,
    features: [{
      feature: String,
      value: String
    }],
    styles: [{
      style_id: Number,
      name: String,
      original_price: String,
      sale_price: String,
      default: Boolean,
      photos: [{
        thumbnail_url: String,
        url: String
      }],
      skus: {
          sku_id: Number,
          quantity: Number,
          size: String
      }
    }]
});

// 'Product' -> will display as products in mongoDB
// also products is the collection within the
// sdc database inside MongoDB
let Product = mongoose.model('Product', productsSchema);

let testFunc = async() => {
  const findAllProducts = await Product.find();

  return findAllProducts;
};

module.exports = {
  testFunc: testFunc
}
