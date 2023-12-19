const express = require("express");
const router = express.Router();
const {getAllUsers,  getOneUser, createUser, loginUser, updateUser, deleteUser, addAddress, deleteAddress, editAddress, getAddresses} = require("../controller/UserController");
const {body} = require("express-validator");
const {authUser, isItAdmin} = require("../middleware/userMiddleware");

router.get("/", authUser, isItAdmin, getAllUsers);

router.get("/:id", authUser, isItAdmin,  getOneUser);

router.post("/register", [
    body("firstname", ["Enter Valid First Name"]).isLength(1),
    body("lastname", ["Enter Valid Last Name"]).isLength(1),
    body("email", ["Enter Valid Email"]).isEmail(),
    body("password", ["Password Must Be Mimimum 8 Letters"]).isLength(8),
    body("mobile", ["Enter Valid Mobile Number"]).isLength({ min: 10, max: 10 }),
], createUser);

router.post("/login", [
    body("email", ["Enter Valid Email"]).isEmail(),
    body("password", ["Enter Valid Password"]).isLength(8),
], loginUser);

router.put("/", 
authUser,
[
    body("firstname", ["Enter Valid First Name"]).isLength(1),
    body("lastname", ["Enter Valid Last Name"]).isLength(1),
    body("email", ["Enter Valid Email"]).isEmail(),
    body("mobile", ["Enter Valid Mobile Number"]).isLength({min: 10, max:10}),
], updateUser);

router.delete("/", authUser, deleteUser);



router.post("/address", authUser,  [
    body("place", ["Enter Valid Place"]).isLength(1),
    body("city", ["Enter Valid City"]).isLength(1),
    body("taluka", ["Enter Valid Taluka"]).isLength(1),
    body("district", ["Enter Valid District"]).isLength(1),
    body("pincode", ["Enter Valid Pincode"]).isLength(5).isNumeric(),
], addAddress);

router.get("/address", authUser, getAddresses);

router.delete("/address/:id", authUser, deleteAddress);

router.put("/address/:id", authUser,  [
    body("place", ["Enter Valid Place"]).isLength(1),
    body("city", ["Enter Valid City"]).isLength(1),
    body("taluka", ["Enter Valid Taluka"]).isLength(1),
    body("district", ["Enter Valid District"]).isLength(1),
    body("pincode", ["Enter Valid Pincode"]).isLength(5).isNumeric(),
], editAddress);



module.exports = router;

