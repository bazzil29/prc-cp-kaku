var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  _id: { type: String },
  sku: { type: String, default: "code" },
  title: String,
  created_date: Date,
  last_get_price: Date,
  last_price: Number,
  old_price: Number,
  last_change: Date,
  url: String,
  shop: Number
});

//create the model for users and expose it to our app
module.exports = mongoose.model("products", productSchema);
