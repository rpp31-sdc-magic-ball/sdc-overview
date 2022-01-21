const mongoose = require('mongoose');
const transformNone = require('../helpers/noPhotoSku');
const transformPhotosOnly = require('../helpers/noSku');
const fullProduct = require('../helpers/fullProduct');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.auth}@54.215.251.35:27017/sdc`, { useNewUrlParser: true, useUnifiedTopology: true});

const stylesSchema = new mongoose.Schema({
  _id: Number,
  productId: Number,
  name: String,
  original_price: String,
  sale_price: String,
  "default?": Boolean,
  photos: [],
  skus: []
});

let Style = mongoose.model('Style', stylesSchema);

const getStyles = async(prodID) => {

  let finalObj = {
    product_id: prodID,
    results: []
  }

  let styleAgg = await Style.aggregate([
    {
      '$match': {
        'productId': Number(prodID)
      }
    }, {
      '$lookup': {
        'from': 'photos',
        'localField': 'id',
        'foreignField': 'styleId',
        'as': 'photos'
      }
    }, {
      '$lookup': {
        'from': 'skus',
        'localField': 'id',
        'foreignField': 'styleId',
        'as': 'skus'
      }
    }
  ]);

  let clone = styleAgg.slice();

  if (clone.length === 0) {
    return finalObj;
  }

  if (clone[0].photos.length === 0 && clone[0].skus.length === 0) {
    finalObj.results = transformNone(clone);

    return finalObj;
  }

  if (clone[0].skus.length === 0) {
    finalObj.results = transformPhotosOnly(clone);

    return finalObj;
  }

  finalObj.results = fullProduct(clone);

  return finalObj;
};

module.exports = {
  getStyles: getStyles
};