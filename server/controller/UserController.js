const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { User } = require("../models/userModel");
const { Address } = require("../models/addressModel");


const getAllUsers = async (req, res) => {

    try {
        const users = await User.find();
        return res.status(200).json({ status: "success", result: users });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] })
    }
}



const getOneUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ status: "error", result: ["वापरकर्ता सापडला नाही!"] });
        }

        return res.status(200).json({ status: "success", result: user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] })
    }
}



const createUser = async (req, res) => {

    if (!validationResult(req).isEmpty()) {
        const result = validationResult(req).errors.map(m => m.msg[0]);
        return res.status(400).json({ status: "error", result: result })
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ status: "error", result: ["दुसरा ईमेल निवडा!"] });
        }

        user = await User.findOne({ mobile: req.body.mobile });

        if (user) {
            return res.status(400).json({ status: "error", result: ["दुसरा मोबाईल नंबर निवडा!"] });
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        user = await User.create({ ...req.body, password: password });

        return res.status(201).json({ status: "success", result: [user] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] })
    }
};


const loginUser = async (req, res) => {

    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ status: "error", result: validationResult(req).errors.map(m => m.msg[0]) })
    }

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ status: "error", result: ["कृपया योग्य ईमेल/पासवर्ड टाका"] });
        }

        const isPasswordMatches = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordMatches) {
            return res.status(401).json({ status: "error", result: ["कृपया योग्य ईमेल/पासवर्ड टाका"] });
        }

        const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.status(200).json({ status: "success", result: [authToken] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] })
    }
}


const updateUser = async (req, res) => {

    if (!validationResult(req).isEmpty()) {
        const result = validationResult(req).errors.map(m => m.msg[0]);
        return res.status(400).json({ status: "error", result: result })
    }

    try {

        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ status: "error", result: ["वापरकर्ता सापडला नाही!"] });
        }

        if (req.user.id !== user._id.toString()) {
            return res.status(401).json({ status: "error", result: ["अनाधिकृत!"] });
        }


        user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ status: "error", result: ["दुसरा ईमेल निवडा!"] });
        }

        user = await User.findOne({ mobile: req.body.mobile });

        if (user) {
            return res.status(400).json({ status: "error", result: ["दुसरा मोबाईल नंबर निवडा!"] });
        }

        user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
        return res.status(201).json({ status: "success", result: [user] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] })
    }

}

const deleteUser = async (req, res) => {

    try {

        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ status: "error", result: ["वापरकर्ता सापडला नाही!"] });
        }

        await User.findByIdAndDelete(req.user.id);
        return res.status(200).json({ status: "success", result: ["यशस्वीरित्या हटवले..."] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] })
    }
}





const getAddresses = async (req, res) => {

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ status: "error", result: ["वापरकर्ता सापडला नाही"] });
        }

        const addresses = [];

        for (const id of user.address)
        {
            addresses.push(await Address.findById(id));
        }

        return res.status(201).json({ status: "success", result: [addresses] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] })
    }
}




const addAddress = async (req, res) => {

    if (!validationResult(req).isEmpty()) {
        const result = validationResult(req).errors.map(m => m.msg[0]);
        return res.status(400).json({ status: "error", result: result })
    }

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ status: "error", result: ["वापरकर्ता सापडला नाही"] });
        }

        const address = await Address.create(req.body);

        user.address.push(address._id);

        return res.status(201).json({ status: "success", result: [user] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] })
    }
}



const deleteAddress = async (req, res) => {

    try {

        let user = await User.findById(req.user.id);
        if (!user)
        {
            return res.status(404).json({ status: "error", result: ["वापरकर्ता सापडला नाही!"] });
        }


        let address = await Address.findById(req.params.id);

        
        if (!address)
        {
            return res.status(404).json({ status: "error", result: ["पत्ता सापडला नाही!"] });
        }
        
        await Address.findByIdAndDelete(req.params.id);

        user.address = user.address.filter(a=>a._id.toString()!==req.params.id);

        user = await User.findByIdAndUpdate(req.user.id, user, {new: true})

        return res.status(200).json({ status: "success", result: ["यशस्वीरित्या हटवले..."] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] })
    }
}


const editAddress = async (req, res) => {

    if (!validationResult(req).isEmpty()) {
        const result = validationResult(req).errors.map(m => m.msg[0]);
        return res.status(400).json({ status: "error", result: result })
    }

    try {
        let user = await User.findById(req.user.id);
        
        if (!user)
        {
            return res.status(404).json({ status: "error", result: ["वापरकर्ता सापडला नाही!"] });
        }



        let address = await Address.findById(req.params.id);

        if (!address)
        {   
            return res.status(404).json({ status: "error", result: ["पत्ता सापडला नाही!"] });
        }

        const {place, city, taluka, district, pincode} = req.body;

        address = await Address.findByIdAndUpdate(req.params.id, {_id: address._id, place, city, taluka, district, pincode,__v: address.__v}, {new: true});

        user.address.push(address._id);

        await User.findByIdAndUpdate(req.user.id, user, {new: true});

        return res.status(201).json({ status: "success", result: [user] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] })
    }
}


const getAddress = async (req, res) => {

    try {
        const address = await Address.findById(req.params.id);

        return res.status(201).json({ status: "success", result: [address] });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "error", result: ["अंतर्गत सर्व्हर त्रुटी!"] })
    }
}

const getUser = (req, res)=>{
    res.status(200).json({status:"success", result: ["अधिकृत"]});
}


module.exports = { 
getAllUsers, 
getOneUser, 
createUser, 
loginUser, 
updateUser, 
deleteUser, 
addAddress, 
deleteAddress, 
editAddress,
getAddresses,
getUser,
getAddress
};
