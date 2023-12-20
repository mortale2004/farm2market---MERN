const { validationResult } = require("express-validator");
const { Address } = require("../models/addressModel");


const addAddress = async (req, res) => {

    if (!validationResult(req).isEmpty()) {
        const result = validationResult(req).errors.map(m => m.msg[0]);
        return res.status(400).json({ status: "error", result: result })
    }

    try {
        const address = await Address.create(req.body);

        return res.status(201).json({ status: "success", result: [address] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["Internal Server Error!"] })
    }
}



const deleteAddress = async (req, res) => {

    try {
        let address = await Address.findById(req.params.id);
        
        if (!address)
        {
            return res.status(404).json({ status: "error", result: ["Address Not Found!"] });
        }
        
        await Address.findByIdAndDelete(req.params.id);

        return res.status(200).json({ status: "success", result: ["Deleted Successfully..."] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["Internal Server Error!"] })
    }
}


const editAddress = async (req, res) => {

    if (!validationResult(req).isEmpty()) {
        const result = validationResult(req).errors.map(m => m.msg[0]);
        return res.status(400).json({ status: "error", result: result })
    }

    try {
        let address = await Address.findById(req.params.id);

        if (!address)
        {   
            return res.status(404).json({ status: "error", result: ["Address Not Found!"] });
        }

        const {place, city, taluka, district, pincode} = req.body;

        address = await Address.findByIdAndUpdate(req.params.id, {_id: address._id, place, city, taluka, district, pincode,__v: address.__v}, {new: true});

        return res.status(201).json({ status: "success", result: [address] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["Internal Server Error!"] })
    }
}


const getAddress = async (req, res) => {

    try {
        const address = await Address.findById(req.params.id);

        return res.status(201).json({ status: "success", result: [address] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["Internal Server Error!"] })
    }
}

module.exports = {addAddress, getAddress, editAddress, deleteAddress};