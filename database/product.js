// const mongoose = require('mongoose');
const { Product, getDate }  = require('./products');

// mongoose.connect('mongodb://localhost/sdc', { useNewUrlParser: true, useUnifiedTopology: true});

const getOneProduct = async(prodID) => {

  const result = await Product.aggregate([
    {
      '$match': {
        'id': Number(prodID)
      }
    }, {
      '$lookup': {
        'from': 'features',
        'localField': 'id',
        'foreignField': 'product_id',
        'as': 'features'
      }
    }, {
      '$project': {
        '_id': 0
      }
    }
  ]);

  let myProduct = result.pop();

  myProduct.created_at = getDate();
  myProduct.updated_at = getDate();
  myProduct.campus = 'hr-rpp';
  myProduct.default_price = `${myProduct.default_price}.00`;

  myProduct.features.forEach(val => {
    delete val._id;
    delete val.id;
    delete val.product_id;
  });

  return myProduct;
}

module.exports = {
  getOneProduct: getOneProduct
};