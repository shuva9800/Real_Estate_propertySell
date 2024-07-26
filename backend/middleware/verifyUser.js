const jwt =require("jsonwebtoken")
require("dotenv").config()

exports.checkAuthentication = async (req,res,next)=>{
try{
    const token = req.body.token || req.cookies.access_token || req.header("Authorization").replace('Bearer ', '');
    if(!token || token===undefined){
        return res.status(401).json({
            success: false,
            message:"token is missing or invalid"
        })
    }
    try{
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode);
        req.findPerson= decode;
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "error occure while decode token"
        })
    }
    next();
}
catch(error){
    console.log(error);
    return res.status(401).json({
        success:false,
        message: " error while token checking for auhhentatication"
    })
}
}
