const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const discountSchema = new Schema({
  code: {
    type: Number,
    min: [1000, "invalid code!"],
    max: [9999, "invalid code!"],
    required: "code is required!",
  },
  codeExpires: {
    type: Number,
    required: "code expiration date is required!",
  },
});

const Discount = mongoose.model("Discount", discountSchema);
module.exports = Discount;
