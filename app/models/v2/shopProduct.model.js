var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  shopSku: { type: String },
  sku: { type: String},
  price:{type:String},
  url: String,
  shop: String
});

//create the model for users and expose it to our app
module.exports = mongoose.model("v2_products", productSchema);
