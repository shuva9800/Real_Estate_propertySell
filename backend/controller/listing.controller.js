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
//delete listing
exports.deleteListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
  
    if (!listing) {
      return res.status(404).json({
        success:false,
        message: "listing not found",
      })
    }
  
    if (req.user.id !== listing.userRef) {
      return res.status(402).json({
        success:false,
        message:'You can only delete your own listings!'
      })
    }
  
    try {
      await Listing.findByIdAndDelete(req.params.id);
      res.status(200).json('Listing has been deleted!');
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "server error",
            error:error.message,
        })
    }
  };

//Update listing
exports.updateListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "listing not found!",
      })
    }
    if (req.user.id !== listing.userRef) {
      return res.status(401).json({
        success: false,
        message:'You can only update your own listings!'
      }) 
    }
    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedListing);
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "server error",
            error:error.message,
        })
    }
  };

 

  //get listing by specfic id
  exports.getListing = async (req,res)=>{
    try{
        const listingItems = await Listing.findById(req.params.id);
        if(!listingItems){
          return res.status(404).json({
            success:false,
            message: "listing not found",
          })
        }
        return res.status(200).json(listingItems);
    }
    catch(error){
      return res.status(500).json({
        success:false,
        message: "server error",
        error:error.message,
    })
    }
  }