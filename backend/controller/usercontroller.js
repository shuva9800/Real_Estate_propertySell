const User = require('../model/usermodel');
const bcrypt = require('bcryptjs');


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

        //find person present in db or not
        const person = await User.findOne({email});
        if(!person){
            return res.status(404).json({
                success: false,
                message: "user nor register go to signin page"
            })
        }
        //compare password
       if(bcrypt.compareSync(password, person.password)) {
        return res.status(200).json({
            success: false,
            message: "user login successfully"
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