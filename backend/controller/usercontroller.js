const User = require('../model/usermodel');
const bcrypt = require('bcryptjs');


exports.signupHandler = async (req,res) =>{
    try{
        const {userName, email, password} = req.body;
        const findPerson = await User.find({email});
        console.log("hello-",findPerson);
        if(findPerson){
            return res.status(402).json({
                success:false,
                message:"User is already exist Login Now"
            })
        }
       
        const hasPassword = bcrypt.hashSync(password, 10);

        const user = await User.create({
            userName,
            email,
            password:hasPassword,
        })
        return res.status(200).json({
            success:true,
            message:"User Signin successfully",
            user:user
        })


    }
    catch(error){
        console.log("server problem");
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}