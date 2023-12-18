const mongoose = require("mongoose");

const connectToMongoDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log(error);        
    }
}
mongoose.connection.on("connected", ()=>{
    console.log("Connected");
})

mongoose.connection.on("disconnected", ()=>{
    console.log("Disconnected");
})

module.exports = connectToMongoDb;

