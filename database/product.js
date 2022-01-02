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

  result.forEach(element => {
    element.created_at = getDate();
    element.updated_at = getDate();
    element.campus = 'hr-rpp';
    element.default_price = `${element.default_price}.00`;

    element.features.forEach(val => {
      delete val._id;
      delete val.id;
      delete val.product_id;
    });
  });

  return result.pop();
}

module.exports = {
  getOneProduct: getOneProduct
};