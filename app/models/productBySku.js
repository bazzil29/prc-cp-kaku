var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  _id: { type: String },
  title: String,
  shops: Array
});

//create the model for users and expose it to our app
module.exports = mongoose.model("product_sku", productSchema);
