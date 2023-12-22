const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const {getAllProducts,  getOneProduct, createProduct, updateProduct, deleteProduct, getUserAllProducts} = require("../controller/ProductController");
const {uploadImageFiles} = require("../middleware/imageUploader");
const {setRequest} = require("../middleware/productMiddleware");
const {authUser} = require("../middleware/userMiddleware"); 

router.get("/",   authUser, getAllProducts);

router.get("/:id", authUser,   getOneProduct);

router.get("/user/products", authUser,   getUserAllProducts);

router.post("/",  uploadImageFiles, authUser, setRequest,[
    body("title", ["वैध नाव प्रविष्ट करा"]).isLength(1),
    body("description", ["वैध वर्णन प्रविष्ट करा"]).isLength(1),
    body("price", ["वैध किंमत प्रविष्ट करा"]).isCurrency(),
], createProduct);

router.put("/:id",  authUser, 
[
    body("title", ["वैध नाव प्रविष्ट करा"]).isLength(1),
    body("description", ["वैध वर्णन प्रविष्ट करा"]).isLength(1),
    body("price", ["वैध किंमत प्रविष्ट करा"]).isCurrency(),
], updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;

