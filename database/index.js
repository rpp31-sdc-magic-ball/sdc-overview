const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sdc', { useNewUrlParser: true, useUnifiedTopology: true});

const productsSchema = new mongoose.Schema({
    _id: Number,
    campus: String,
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: String,
    created_at: Date,
    updated_at: Date,
    features: [{
      feature: String,
      value: String
    }],
    results: [{
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
    }],
    related: [Number]
});

let Repo = mongoose.model('SDC', productsSchema);