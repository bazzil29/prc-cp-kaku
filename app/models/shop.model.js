var mongoose = require("mongoose");

var shopSchema = mongoose.Schema({
  _id: { type: String, default: uuidv1() },
  products: Array,
  name: String,
  menu_html: { type: String, default: "" },
  price_html: { type: String, default: "" }
});

//create the model for users and expose it to our app
module.exports = mongoose.model("shops", shopSchema, "Shop");
