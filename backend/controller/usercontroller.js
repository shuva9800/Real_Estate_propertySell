const User = require('../model/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SiTrueup } = require('react-icons/si');
require("dotenv").config();



exports.signupHandler = async (req,res) =>{
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password){
          return res.status(400).json({
            success: false,
            message:"all field to be filled"
          })
        }
        const findPerson = await User.findOne({email});
        console.log("hello-",findPerson);
        if(findPerson){
            return res.status(400).json({
                success:false,
                message:"User is already exist Login Now"
            })
        }
       
        const hasPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ userName : username, email, password: hasPassword });
        await newUser.save();
        // const user = await User.create({
        //     userName: username,
        //     email,
        //     password:hasPassword,
        // })
        newUser.password = "undefined";
        return res.status(200).json({
            success:true,
            message:"User Signin successfully",
            user:newUser
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
        if(!email || !password){
            return res.status(401).json({
                success: false,
                message:"fill all the field",
            })
        }
        
        //find person present in db or not
        const person = await User.findOne({email:email});
        if(!person){
            return res.status(404).json({
                success: false,
                message: "user nor register go to signin page"
            })
        }
      
        console.log(person)
        //compare password
        const validPassword = bcrypt.compareSync(password, person.password);

       if( validPassword) {
        const token =  jwt.sign({id: person._id}, process.env.jwt_secret);
        person.password = "undefined";
        
        return res.cookie("loginToken",token,{
                httpOnly: true,
                expires: new Date(Date.now() + 24*60*60*1000 )
        }, ).status(200).json({
            success: true,
            message: "user login successfully",
            token,
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

//signup with google account
exports.google = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('loginToken', token, { httpOnly: true , expires: new Date(Date.now() + 24*60*60*1000 )})
          .status(200)
          .json(rest);
      } else {
        // const generatedPassword =
        //   Math.random().toString(36).slice(-8) +
        //   Math.random().toString(36).slice(-8);

        const generatedPassword =
          Math.random().toString(36) + Math.random().toString(36);
        const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
        const newUser = new User({
          userName:
            req.body.name.split(' ').join('').toLowerCase() +
            Math.random(),
            // .slice(-4),
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.photo,
        });
        newUser.password= "undefined";
        // console.log("newuser", newUser);
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res
          .cookie('loginToken', token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
    } catch (error) {
     return res.status(500).json({
        success: false,
        message:"server porblem while verify the user with google",
        error: error.message

     })
    }
  };
  

//   //signout

  exports.signOut = async (req, res) => {
    try {
      res.clearCookie('loginToken');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:"server porblem while sign out",
        error: error.message
      })
    }
  };