const fullProduct = (clone) => {
  clone.sort((a, b) => a.id - b.id);

  clone.forEach(element => {
    delete element._id;
    element.style_id = element.id;
    delete element.id;
    delete element. productId;
    element.original_price = `${element.original_price}.00`;

    if (element.sale_price !== 'null') {
      element.sale_price = `${element.sale_price}.00`;
    } else {
      element.sale_price = null;
    }

    if (element.default_style === 1) {
      element['default?'] = true;
    } else {
      element['default?'] = false;
    }

    delete element.default_style;

    if (element.photos.length > 1) {
      element.photos.sort((a, b) => a.id - b.id);
    }

    element.photos.forEach(photo => {
      delete photo._id;
      delete photo.id;
      delete photo.styleId;
    });

    element.skus.sort((a, b) => a.id - b.id);

    let skusObj = {};

    element.skus.forEach(sku => {
      skusObj[JSON.stringify(sku.id)] = {
          quantity: sku.quantity,
          size: sku.size
      }
    });

    element.skus = skusObj;

  });


  return clone;
};

module.exports = fullProduct;