const Listing = require('../model/listing.model')

exports.createListing = async (req,res)=>{
    try{
         const listing = await Listing.create(req.body);
         return res.status(200).json({
            success:true,
            message:"listing successful",
            data:listing
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