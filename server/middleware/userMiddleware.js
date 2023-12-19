const jwt = require("jsonwebtoken");
const {User} = require("../models/userModel");
const { ConnectionStates } = require("mongoose");

const authUser = (req, res, next)=>{
    const authToken = req.header("auth-token");

    if (!authToken)
    {
        return res.status(401).json({status: "error", result: ["Unauthorized User!"]});
    }

    try {
             
        const payload = jwt.verify(authToken, process.env.JWT_SECRET);
        
        req.user = {
            id: payload.id
        }
        
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({status: "error", result: ["Unauthorized User!"]});
    }
}

const isItAdmin = async (req, res, next) =>{

    console.log("hisdfjsdifjdsifdsji");
    
    const user = await User.findById(req.user.id);

    if (!user)
    {
        return res.status(401).json({status: "error", result:["User Not Found!"]})
    }

    if (!user.isAdmin)
    {
        return res.status(401).json({status: "error", result:["You Are Not An Admin!"]})
    }
    
    next();
}

module.exports = {authUser, isItAdmin};