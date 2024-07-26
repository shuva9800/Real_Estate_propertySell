// import bcryptjs from 'bcryptjs';
// import User from '../models/user.model.js';
// import { errorHandler } from '../utils/error.js';
// import Listing from '../models/listing.model.js';

// export const test = (req, res) => {
//   res.json({
//     message: 'Api route is working!',
//   });
// };

// export const updateUser = async (req, res, next) => {
//   if (req.user.id !== req.params.id)
//     return next(errorHandler(401, 'You can only update your own account!'));
//   try {
//     if (req.body.password) {
//       req.body.password = bcryptjs.hashSync(req.body.password, 10);
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           username: req.body.username,
//           email: req.body.email,
//           password: req.body.password,
//           avatar: req.body.avatar,
//         },
//       },
//       { new: true }
//     );

//     const { password, ...rest } = updatedUser._doc;

//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };
const User = require('../model/usermodel');
const {imageUploadToCloudinary} = require('../utils/fileUpload');
const bcrypt = require('bcryptjs');
require("dotenv").config();


exports.updateUser = async (req,res)=>{
    console.log("inside ueser update controller" , req.body);
    console.log(req.params.id)
    console.log("file is", req.files);
   try{
    console.log("inside ueser update controller" , req.body)
    const userId = req.params.id;
    const {userName,email,password,avater} = req.body;
    const profilePhoto = req.files.profilePhoto;
    //find by id 
    const profileUser = await User.findById({_id: userId});
    if(!profileUser){
        return res.status(404).json({
            success: false,
            message: "you can update your profile only"
        })
    }
    let hashPassword = null;
    if(password){
         hashPassword = bcrypt.hashSync(password,10);
    }

    const updatedProfile = await User.findByIdAndUpdate({_id:userId},
        {
            userName: userName,
            email: email,
            password: hashPassword,
            avater: imageValue.secure_url,
        },
        {new:true}
    )
    updatedProfile.password = "undefined";
    return res.status(200).json({
        success:true,
        message :"profile updated successfully",
        updatedProfile

    })

   }
   catch(error){
    return res.status(500).json({
        success:false,
        message: "server error",
        error:error.message,
    })
   }
}

//delete profile

exports.deleteProfile = async (req,res)=>{
    try{
        const {id}= req.params;
        const deleteaccount = await User.findByIdAndDelete({_id:id});
        return res.status(200).json({
            success: true,
            message:"account deleted successfully",
            data:deleteaccount
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: "server error",
            error:error.message,
        })
    }
}