const mongoose = require("mongoose");
const { userSchema } = require("./userModel");

const processorSchema =  mongoose.Schema({
    userSchema,
    buy: {
        type: [{type: mongoose.Types.ObjectId, ref: "products"}]
    }
});

module.exports = mongoose.model("processor", processorSchema);