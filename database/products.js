const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sdc', { useNewUrlParser: true, useUnifiedTopology: true});

const productsSchema = new mongoose.Schema({
    _id: Number,
    id: {type: Number, index: true},
    campus: {type: String, index: true},
    name: {type: String, index: true},
    slogan: {type: String, index: true},
    description: {type: String, index: true},
    category: {type: String, index: true},
    default_price: {type: String, index: true},
    created_at: {type: String, index: true},
    updated_at: {type: String, index: true},
    features: [{
      feature: {type: String, index: true},
      value: {type: String, index: true}
    }]
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

const getProduct = async() => {

  // lean() returns a plain JS object so we can manipulate it
  let topProducts = await Product.find({id: { $lt: 6}}).sort({ id: 1 }).lean();

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
  getProduct: getProduct,
  Product: Product,
  getDate: getDate
}
