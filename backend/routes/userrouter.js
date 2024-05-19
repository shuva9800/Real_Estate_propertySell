const express = require('express');
const router = express.Router();


const{signupHandler,loginHandler, google} = require('../controller/usercontroller');
const {updateUser,deleteProfile} = require('../controller/profilecontroller')



router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.post('/google', google);
router.post('/updateprofile/:id',updateUser)
router.delete('/delete/:id', deleteProfile)




module.exports = router;