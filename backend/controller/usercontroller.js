const User = require('../model/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SiTrueup } = require('react-icons/si');
require("dotenv").config();
// console.log(".env file")
// console.log(process.env.jwt_secret);


exports.signupHandler = async (req,res) =>{
    try{
        console.log(req.body)
        const {username, email, password} = req.body;
        const findPerson = await User.findOne({email});
        console.log("hello-",findPerson);
        if(findPerson){
            return res.status(400).json({
                success:false,
                message:"User is already exist Login Now"
            })
        }
       
        const hasPassword = bcrypt.hashSync(password, 10);
        // const newUser = new User({ userName : username, email, password: hasPassword });
        // await newUser.save();
        const user = await User.create({
            userName: username,
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
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}
//login page
exports.loginHandler = async (req,res)=>{
    try{
        const {email, password} = req.body;
        // console.log(req.body)

        //find person present in db or not
        const person = await User.findOne({email});
        if(!person){
            return res.status(404).json({
                success: false,
                message: "user nor register go to signin page"
            })
        }
      
        console.log(person)
        //compare password
       if(await bcrypt.compare(password, person.password)) {
        const token =  jwt.sign({id: person._id}, process.env.jwt_secret);
        person.password = "undefined";
        
        return res.cookie("loginToken",token,{
                httpOnly: true,
                expires: new Date(Date.now() + 60*1000 )
        }, ).status(200).json({
            success: true,
            message: "user login successfully",
            data: person

        })
       }
       else{
        return res.status(404).json({
            success: false,
            message:"password does not match try again"
        })
       }
    }
    catch(error){
        console.log("server problem");
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}