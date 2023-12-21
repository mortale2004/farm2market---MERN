const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const {addMessage} = require("../controller/ContactController");

router.post("/", [
    body("name", ["वैध नाव प्रविष्ट करा"]).isLength(1),
    body("email", ["वैध ईमेल प्रविष्ट करा"]).isEmail(),
    body("mobile", ["वैध मोबाइल क्रमांक प्रविष्ट करा"]).isLength({ min: 10, max: 10 }),
    body("message", ["वैध संदेश प्रविष्ट करा"]).isLength(2)
], addMessage);

module.exports = router;

