const Category = require("../models/categoryModel");
const {validationResult} = require("express-validator");

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();  
        return res.status(201).json({status: "success", result: categories});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["अंतर्गत सर्व्हर त्रुटी!"]})
    }
}

const getOneCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);  

        if (!category)
        {
            return res.status(404).json({status: "error", result:["श्रेणी आढळली नाही!"]}); 
        }

        return res.status(201).json({status: "success", result:[category]});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["अंतर्गत सर्व्हर त्रुटी!"]})
    }
}


const createCategory = async (req, res) => {
    if (!validationResult(req).isEmpty())
    {
        const result = validationResult(req).errors.map(m=>m.msg[0]);
        return res.status(400).json({status: "error", result:result})
    }

    try {

        let category = await Category.findOne({title: req.body.title});
        
        if (category)
        {
            return res.status(400).json({status: "error", result:["दुसरे शीर्षक निवडा!"]});
        }

        category = await Category.create(req.body);  
        return res.status(201).json({status: "success", result:[category]});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["अंतर्गत सर्व्हर त्रुटी!"]})
    }
}

const updateCategory = async (req, res) => {
    if (!validationResult(req).isEmpty())
    {
        const result = validationResult(req).errors.map(m=>m.msg[0]);
        return res.status(400).json({status: "error", result:result})
    }

    try {

        let category = await Category.findById(req.params.id);

        if (!category)
        {
            return res.status(404).json({status: "error", result:["श्रेणी आढळली नाही!"]});
        }

        category = await Category.findOne({title: req.body.title});
        
        if (category)
        {
            return res.status(400).json({status: "error", result:["दुसरे शीर्षक निवडा!"]});
        }

        category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});  

        return res.status(201).json({status: "success", result:[category]});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["अंतर्गत सर्व्हर त्रुटी!"]})
    }
}

const deleteCategory = async (req, res) => {
    
    try {
        const category = await Category.findById(req.params.id);

        if (!category)
        {
            return res.status(404).json({status: "error", result:["श्रेणी आढळली नाही!"]});
        }

        await Category.findByIdAndDelete(req.params.id);  
        return res.status(200).json({status: "success", result:["यशस्वीरित्या हटवले..."]});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["अंतर्गत सर्व्हर त्रुटी!"]})
    }
}

module.exports = { getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory };
