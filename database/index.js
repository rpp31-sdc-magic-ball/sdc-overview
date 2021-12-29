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
    features: {
      feature: String,
      value: String
    },
    styles: {
      name: String,
      original_price: String,
      sale_price: String,
      default_style: Boolean
    },
    style_id: Number,
    skus: {
      size: String,
      quantity: Number
    },
    photos: {
      url: String,
      thumbnail_url: String
    }
});

// 'Product' -> will display as products in mongoDB
// also products is the collection within the
// sdc database inside MongoDB
let Product = mongoose.model('Product', productsSchema);

const getDate = () => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  return today.toISOString();
}

let getProduct = async() => {

  // lean() returns a plain JS object so we can manipulate it
  let topProducts = await Product.find({id: { $lt: 6}}).lean();

  topProducts.forEach(element => {
    delete element._id;
    element.campus = 'hr-rpp';
    element.default_price = `${element.default_price}.00`;
    element.created_at = getDate();
    element.updated_at = getDate();
  });

  return topProducts;
};

module.exports = {
  getProduct: getProduct
}
