const mongoose = require('mongoose');
const transformNone = require('../helpers/noPhotoSku');

mongoose.connect('mongodb://localhost/sdc', { useNewUrlParser: true, useUnifiedTopology: true});

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

  // console.log(clone)

  if (clone[0].photos.length === 0 && clone[0].skus.length === 0) {
    finalObj.results = transformNone(clone);

    return finalObj;
  }

  if (clone[0].skus.length === 0) {

  }

  // clone.forEach(element => {
  //   delete element.productId;
  //   delete element._id;
  //   element.style_id = element.id;
  //   delete element.id;

  //   if (element.default_style === 1) {
  //     element['default?'] = true;
  //   } else {
  //     element['default?'] = false;
  //   }

  //   delete element.default_style;

  //   element.original_price = `${element.original_price}.00`;

  //   if (element.sale_price !== 'null') {
  //     element.sale_price = `${element.sale_price}.00`;
  //   } else {
  //     element.sale_price = null;
  //   }

  //   element.photos.sort((a, b) => a.id - b.id);

  //   element.photos.forEach(photo => {
  //     delete photo._id;
  //     delete photo.id;
  //     delete photo.styleId;
  //   });
  // });

  return 'one';
};

module.exports = {
  getStyles: getStyles
};