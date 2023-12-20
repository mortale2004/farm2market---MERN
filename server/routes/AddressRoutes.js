const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const {addAddress, getAddress, deleteAddress, editAddress} = require("../controller/AddressController");
const {authUser} = require("../middleware/userMiddleware");


router.post("/",  authUser, [
    body("place", ["वैध ठिकाण प्रविष्ट करा"]).isLength(1),
    body("city", ["वैध शहर प्रविष्ट करा"]).isLength(1),
    body("taluka", ["वैध तालुका प्रविष्ट करा"]).isLength(1),
    body("district", ["वैध जिल्हा प्रविष्ट करा"]).isLength(1),
    body("pincode", ["वैध पिनकोड प्रविष्ट करा"]).isLength(5).isNumeric(),
], addAddress);

router.get("/:id", authUser, getAddress);

router.delete("/:id", authUser, deleteAddress);

router.put("/:id", authUser,  [
    body("place", ["वैध ठिकाण प्रविष्ट करा"]).isLength(1),
    body("city", ["वैध शहर प्रविष्ट करा"]).isLength(1),
    body("taluka", ["वैध तालुका प्रविष्ट करा"]).isLength(1),
    body("district", ["वैध जिल्हा प्रविष्ट करा"]).isLength(1),
    body("pincode", ["वैध पिनकोड प्रविष्ट करा"]).isLength(5).isNumeric(),
], editAddress);



module.exports = router;

