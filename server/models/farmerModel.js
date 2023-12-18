const mongoose = require("mongoose");
const { userSchema } = require("./userModel");

const farmerSchema =  mongoose.Schema({
    userSchema,
    sell: {
        type: [{type: mongoose.Types.ObjectId, ref: "products"}]
    }
});

module.exports = mongoose.model("farmers", farmerSchema);