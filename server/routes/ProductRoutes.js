const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const {getAllProducts,  getOneProduct, createProduct, updateProduct, deleteProduct} = require("../controller/ProductController");
const {uploadImageFiles} = require("../middleware/imageUploader");
const {setRequest} = require("../middleware/productMiddleware");

router.get("/",  getAllProducts);

router.get("/:id",  getOneProduct);

router.post("/", uploadImageFiles, setRequest, [
    body("title", ["Enter Valid Title"]).isLength(1),
    body("description", ["Enter Valid Description"]).isLength(1),
    body("price", ["Enter Valid Price"]).isCurrency(),
], createProduct);


router.put("/:id", 
[
    body("title", ["Enter Valid Title"]).isLength(1),
    body("description", ["Enter Valid Description"]).isLength(1),
    body("price", ["Enter Valid Price"]).isCurrency(),
], updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;

