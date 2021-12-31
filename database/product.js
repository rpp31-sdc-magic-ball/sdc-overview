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
        '_id': 0,
        'id': 1,
        'name': 1,
        'slogan': 1,
        'description': 1,
        'category': 1,
        'default_price': 1,
        'features': {
          '$map': {
            'input': '$features',
            'as': 'features',
            'in': {
              'feature': '$$features.feature',
              'value': '$$features.value'
            }
          }
        }
      }
    }
  ])

  result.forEach(element => {
    element.created_at = getDate();
    element.updated_at = getDate();
    element.campus = 'hr-rpp';
    element.default_price = `${element.default_price}.00`;

  });


  return result.pop();
};

module.exports = {
  getOneProduct: getOneProduct
};