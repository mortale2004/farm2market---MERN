const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const {User} = require("../models/userModel");


const getAllUsers = async (req, res)=>{
   
    try {
        const users = await User.find();
        return res.status(200).json({status: "success", result:users});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["Internal Server Error!"]})
    }
}



const getOneUser = async (req, res)=> {
   
    try {
        const user = await User.findById(req.params.id);
        if (!user)
        {
            return res.status(404).json({status: "error", result:["User Not Found!"]});  
        }

        return res.status(200).json({status: "success", result:user});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["Internal Server Error!"]})
    }
}



const createUser = async (req, res)=>{

    if (!validationResult(req).isEmpty())
    {
        const result = validationResult(req).errors.map(m=>m.msg[0]);
        return res.status(400).json({status: "error", result:result})
    }

    try {
        let user = await User.findOne({email: req.body.email});
        
        if (user)
        {
            return res.status(400).json({status: "error", result:["Choose Another Email"]});
        }

        user = await User.findOne({mobile: req.body.mobile});

        if (user)
        {
            return res.status(400).json({status: "error", result:["Choose Another Mobile Number"]});
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        user = await User.create({...req.body, password: password});  
        
        return res.status(201).json({status: "success", result:[user]});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["Internal Server Error!"]})
    }
};


const loginUser = async (req, res)=>{

    if (!validationResult(req).isEmpty())
    {
        return res.status(400).json({status: "error", result:validationResult(req).errors.map(m=>m.msg[0])})
    }

    try {
        const user = await User.findOne({email: req.body.email});

        if (!user)
        {
            return res.status(401).json({status: "error", result:["Please Enter Correct Email/Password"]});
        }
        
        const isPasswordMatches = await bcrypt.compare(req.body.password, user.password);
        
        if (!isPasswordMatches)
        {
            return res.status(401).json({status: "error", result:["Please Enter Correct Email/Password"]});
        }

        const authToken = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        return res.status(200).json({status: "success", result:[authToken]});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["Internal Server Error!"]})
    }
}


const updateUser = async (req, res)=>{

    if (!validationResult(req).isEmpty())
    {
        const result = validationResult(req).errors.map(m=>m.msg[0]);
        return res.status(400).json({status: "error", result:result})
    }

    try {

        let user = await User.findById(req.user.id);

        if (!user)
        {
            return res.status(404).json({status: "error", result:["User Not Found!"]});
        }

        if (req.user.id!==user._id.toString())
        {
            return res.status(401).json({status: "error", result: ["Unauthorized"]});
        }
        

        user = await User.findOne({email: req.body.email});
        
        if (user)
        {
            return res.status(400).json({status: "error", result:["Choose Another Email"]});
        }

        user = await User.findOne({mobile: req.body.mobile});

        if (user)
        {
            return res.status(400).json({status: "error", result:["Choose Another Mobile Number"]});
        }

        user = await User.findByIdAndUpdate(req.user.id, req.body, {new: true});  
        return res.status(201).json({status: "success", result:[user]});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["Internal Server Error!"]})
    }

}

const deleteUser = async (req, res)=>{

    try {

        let user = await User.findById(req.user.id);

        if (!user)
        {
            return res.status(404).json({status: "error", result:["User Not Found!"]});
        }

        await User.findByIdAndDelete(req.user.id);  
        return res.status(200).json({status: "success", result:["Deleted Successfully..."]});  

    } catch (error) {
        console.log(error);
        return res.status(500).json({status: "error", result:["Internal Server Error!"]})
    }
}

module.exports = {getAllUsers, getOneUser, createUser, loginUser, updateUser, deleteUser};
