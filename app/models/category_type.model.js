var mongoose = require("mongoose");

var CategoryType = mongoose.Schema({
  _id: { type: String }
});

//create the model for users and expose it to our app
module.exports = mongoose.model("category_type", CategoryType);
