require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connectToMongoDb = require("./config/db");


connectToMongoDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use("/api/auth/users", require("./routes/UserRoutes"));
app.use("/api/products", require("./routes/ProductRoutes"));
app.use("/api/category", require("./routes/CategoryRoutes"));


app.listen(process.env.PORT, (req, res) => {
    console.log("Server Started");
});