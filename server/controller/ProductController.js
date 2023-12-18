const { validationResult } = require("express-validator");
const { Product } = require("../models/productModel");
const slugify = require("slugify");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();  
        return res.status(201).json({status: "success", result: products});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["Internal Server Error!"]})
    }
}

const getOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);  

        if (!product)
        {
            return res.status(404).json({status: "error", result:["Product Not Found!"]}); 
        }

        return res.status(201).json({status: "success", result:[product]});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["Internal Server Error!"]})
    }
}


const createProduct = async (req, res) => {
    if (!validationResult(req).isEmpty())
    {
        const result = validationResult(req).errors.map(m=>m.msg[0]);
        return res.status(400).json({status: "error", result:result})
    }

    try {

        req.body.slug = slugify(req.body.title);

        let product = await Product.findOne({slug: req.body.slug});
        
        if (product)
        {
            return res.status(400).json({status: "error", result:["Choose Another Title"]});
        }

        product = await Product.create(req.body);  
        return res.status(201).json({status: "success", result:[product]});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["Internal Server Error!"]})
    }
}

const updateProduct = async (req, res) => {
    if (!validationResult(req).isEmpty())
    {
        const result = validationResult(req).errors.map(m=>m.msg[0]);
        return res.status(400).json({status: "error", result:result})
    }

    try {

        let product = await Product.findById(req.params.id);

        if (!product)
        {
            return res.status(404).json({status: "error", result:["Product Not Found!"]});
        }

        req.body.slug = slugify(req.body.title);

        product = await Product.findOne({slug: req.body.slug});

        if (product)
        {
            return res.status(400).json({status: "error", result:["Choose Another Title"]});
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});  

        return res.status(201).json({status: "success", result:[product]});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["Internal Server Error!"]})
    }
}

const deleteProduct = async (req, res) => {
    
    try {

        const product = await Product.findById(req.params.id);

        if (!product)
        {
            return res.status(404).json({status: "error", result:["Product Not Found!"]});
        }

        await Product.findByIdAndDelete(req.params.id);  
        return res.status(200).json({status: "success", result:["Deleted Successfully..."]});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["Internal Server Error!"]})
    }
}

module.exports = { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct };