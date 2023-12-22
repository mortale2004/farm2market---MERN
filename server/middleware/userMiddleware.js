const jwt = require("jsonwebtoken");
const {User} = require("../models/userModel");
const { ConnectionStates } = require("mongoose");

const authUser = (req, res, next)=>{
    const authToken = req.header("auth-token");

    if (!authToken)
    {
        return res.status(401).json({status: "error", result: ["अनधिकृत वापरकर्ता!"]});
    }

    try {
             
        const payload = jwt.verify(authToken, process.env.JWT_SECRET);
        
        req.user = {
            id: payload.id
        }
        
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({status: "error", result: ["अनधिकृत वापरकर्ता!"]});
    }
}

const isItAdmin = async (req, res, next) =>{

    const user = await User.findById(req.user.id);

    if (!user)
    {
        return res.status(401).json({status: "error", result:["वापरकर्ता सापडला नाही!"]})
    }

    if (!user.isAdmin)
    {
        return res.status(401).json({status: "error", result:["तुम्ही अ‍ॅडमिन नाही!"]})
    }
    
    next();
}

module.exports = {authUser, isItAdmin};