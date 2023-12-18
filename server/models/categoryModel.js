const mongoose = require("mongoose");

const categorySchema =  mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    Date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("category", categorySchema);