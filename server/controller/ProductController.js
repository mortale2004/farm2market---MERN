const { validationResult } = require("express-validator");
const { Product } = require("../models/productModel");
const uploadCloud = require("../utils/cloudinary");
const fs = require("fs");
const { User } = require("../models/userModel");
const { Address } = require("../models/addressModel");
const { default: mongoose } = require("mongoose");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ status: "success", result: products });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] });
  }
};

const getUserAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id });
    return res.status(200).json({ status: "success", result: products });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ status: "error", result: ["उत्पादन आढळले नाही!"] });
    }

    return res.status(201).json({ status: "success", result: [product] });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] });
  }
};

const createProduct = async (req, res) => {
  const images = [];
  const files = req.files;

  if (!validationResult(req).isEmpty()) {
    for (const file of files) {
      const { path } = file;
      fs.unlinkSync(path);
    }

    const result = validationResult(req).errors.map((m) => m.msg[0]);
    return res.status(400).json({ status: "error", result: result });
  }

  try {
    for (const file of files) {
      const { path } = file;
      const result = await uploadCloud(path);
      images.push(result.url);
      fs.unlinkSync(path);
    }

    req.body.userId = req.user.id;

    const product = await Product.create({
      ...req.body,
      images: images,
      address: new mongoose.mongo.ObjectId(req.body.address),
    });

    console.log("product created");
    let user = await User.findById(req.user.id);

    user.sell.push(product._id);
    user = await User.findByIdAndUpdate(req.user.id, user, { new: true });

    return res.status(201).json({ status: "success", result: [product] });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] });
  }
};

const updateProduct = async (req, res) => {
  if (!validationResult(req).isEmpty()) {
    const result = validationResult(req).errors.map((m) => m.msg[0]);
    return res.status(400).json({ status: "error", result: result });
  }

  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ status: "error", result: ["उत्पादन आढळले नाही!"] });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(201).json({ status: "success", result: [product] });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ status: "error", result: ["उत्पादन आढळले नाही!"] });
    }

    let user = await User.findById(product.userId);

    user.sell = user.sell.filter((s) => s.toString() !== req.params.id);

    user = await User.findByIdAndUpdate(product.userId, user, { new: true });

    const address = await Address.findByIdAndDelete(product.address);

    await Product.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ status: "success", result: ["यशस्वीरित्या हटवले..."] });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] });
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getUserAllProducts,
};
