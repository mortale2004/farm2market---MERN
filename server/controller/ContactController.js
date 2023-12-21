const Contact = require("../models/contactModel");
const {validationResult} = require("express-validator");

const addMessage = async (req, res) =>{
    if (!validationResult(req).isEmpty())
    {
        const result = validationResult(req).errors.map(m=>m.msg[0]);
        return res.status(400).json({status: "error", result:result})
    }

    try {
        const message = await Contact.create(req.body);  
        return res.status(201).json({status: "success", result:["संदेश यशस्वीरीत्या पाठवला..."]});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["Internal Server Error!"]})
    }
}

module.exports = {addMessage}