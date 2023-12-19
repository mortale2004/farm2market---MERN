const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    place:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true,
    },
    taluka:{
        type: String,
        required: true,
    },
    district:{
        type: String,
        required: true,
    },
    pincode:{
        type: Number,
        required: true,
    }
});

module.exports = {addressSchema, Address: mongoose.model("address", addressSchema)};