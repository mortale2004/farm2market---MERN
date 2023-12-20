const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
        default:"general"
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    rating: {
        type: Number,
        postedby: {type: mongoose.Schema.Types.ObjectId, ref: "user"}
    }
});

module.exports = {productSchema: productSchema, Product: mongoose.model("product", productSchema)};