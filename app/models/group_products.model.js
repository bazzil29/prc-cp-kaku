var mongoose = require("mongoose");
const uuidv1 = require("uuid/v1");

var productsGroupSchema = mongoose.Schema({
  _id: { type: String, default: uuidv1() },
  sku: String,
  title: String,
  created_date: Date,
  last_get_price: Date,
  last_price: Number,
  old_price: Number,
  last_change: Date
});

//create the model for users and expose it to our app
module.exports = mongoose.model(
  "group_products",
  productsGroupSchema,
  "ProductsGroup"
);
