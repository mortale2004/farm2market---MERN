const mongoose = require("mongoose");
const { userSchema } = require("./userModel");

const productBuyerSchema =  mongoose.Schema({
    userSchema,
    cart: {
        type: [{type: mongoose.Types.ObjectId, ref: "products"}]
    }
});

module.exports = mongoose.model("productBuyer", productBuyerSchema);