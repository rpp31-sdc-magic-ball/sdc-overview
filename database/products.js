const mongoose = require('mongoose');

mongoose.connect('mongodb://poyraz:poyraz@54.183.156.254:27017/sdc', { useNewUrlParser: true, useUnifiedTopology: true});

const productsSchema = new mongoose.Schema({
    _id: Number,
    id: {type: Number, index: true},
    campus: String,
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: String,
    created_at: String,
    updated_at: String
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
