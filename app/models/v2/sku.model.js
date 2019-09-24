var mongoose = require("mongoose");

var skuSchema = mongoose.Schema({
  _id: { type: String }
});

//create the model for users and expose it to our app
module.exports = mongoose.model("v2_skus", skuSchema);
