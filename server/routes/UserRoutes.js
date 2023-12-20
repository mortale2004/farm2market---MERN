const express = require("express");
const router = express.Router();
const {getAddress,getUser, getAllUsers,  getOneUser, createUser, loginUser, updateUser, deleteUser, addAddress, deleteAddress, editAddress, getAddresses} = require("../controller/UserController");
const {body} = require("express-validator");
const {authUser, isItAdmin} = require("../middleware/userMiddleware");

router.post("/getuser", authUser, getUser);

router.get("/", authUser, isItAdmin, getAllUsers);

router.get("/:id", authUser,  getOneUser);

router.post("/register", [
    body("firstname", ["वैध पहिले नाव प्रविष्ट करा"]).isLength(1),
    body("lastname", ["वैध आडनाव प्रविष्ट करा"]).isLength(1),
    body("email", ["वैध ईमेल प्रविष्ट करा"]).isEmail(),
    body("password", ["पासवर्ड किमान 8 अक्षरांचा असणे आवश्यक आहे"]).isLength(8),
    body("mobile", ["वैध मोबाइल क्रमांक प्रविष्ट करा"]).isLength({ min: 10, max: 10 }),
    body("role", ["तुमची भूमिका प्रविष्ट करा"]).isLength(2)
], createUser);

router.post("/login", [
    body("email", ["वैध ईमेल प्रविष्ट करा"]).isEmail(),
    body("password", ["पासवर्ड किमान 8 अक्षरांचा असणे आवश्यक आहे"]).isLength(8),
], loginUser);

router.put("/", 
authUser,
[
    body("firstname", ["वैध पहिले नाव प्रविष्ट करा"]).isLength(1),
    body("lastname", ["वैध आडनाव प्रविष्ट करा"]).isLength(1),
    body("email", ["वैध ईमेल प्रविष्ट करा"]).isEmail(),
    body("mobile", ["वैध मोबाइल क्रमांक प्रविष्ट करा"]).isLength({min: 10, max:10}),
    body("role", ["तुमची भूमिका प्रविष्ट करा"]).isLength(2)
], updateUser);

router.delete("/", authUser, deleteUser);



router.post("/address", authUser,  [
    body("place", ["वैध ठिकाण प्रविष्ट करा"]).isLength(1),
    body("city", ["वैध शहर प्रविष्ट करा"]).isLength(1),
    body("taluka", ["वैध तालुका प्रविष्ट करा"]).isLength(1),
    body("district", ["वैध जिल्हा प्रविष्ट करा"]).isLength(1),
    body("pincode", ["वैध पिनकोड प्रविष्ट करा"]).isLength(5).isNumeric(),
], addAddress);

router.get("/address", authUser, getAddresses);

router.get("/address/:id", authUser, getAddress);



router.delete("/address/:id", authUser, deleteAddress);

router.put("/address/:id", authUser,  [
    body("place", ["वैध ठिकाण प्रविष्ट करा"]).isLength(1),
    body("city", ["वैध शहर प्रविष्ट करा"]).isLength(1),
    body("taluka", ["वैध तालुका प्रविष्ट करा"]).isLength(1),
    body("district", ["वैध जिल्हा प्रविष्ट करा"]).isLength(1),
    body("pincode", ["वैध पिनकोड प्रविष्ट करा"]).isLength(5).isNumeric(),
], editAddress);



module.exports = router;

