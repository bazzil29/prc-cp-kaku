var mongoose = require("mongoose");

var shopSchema = mongoose.Schema({
  _id: { type: String }
});

//create the model for users and expose it to our app
module.exports = mongoose.model("v2_shops", shopSchema);
