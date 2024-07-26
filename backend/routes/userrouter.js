const express = require('express');
const router = express.Router();


const{signupHandler,loginHandler, google} = require('../controller/usercontroller');
const {updateUser,deleteProfile} = require('../controller/profilecontroller');
const { checkAuthentication } = require('../middleware/verifyUser');



router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.post('/google', google);
//updation
router.post('/updateprofile/:id',checkAuthentication,updateUser)

router.delete('/delete/:id', deleteProfile)







module.exports = router;