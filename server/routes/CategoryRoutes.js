const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const { getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory } = require("../controller/CategoryController");



router.get("/",  getAllCategories);

router.get("/:id",  getOneCategory);

router.post("/", [
    body("title", ["Enter Valid Title"]).isLength(1),
], createCategory);


router.put("/:id", 
[
    body("title", ["Enter Valid Title"]).isLength(1),
], updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;

